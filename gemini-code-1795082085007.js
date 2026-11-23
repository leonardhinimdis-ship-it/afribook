const crypto = require('crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret-change-me';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-me';
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_DAYS = Number(process.env.JWT_REFRESH_DAYS || 30);

// Limitation des tentatives sur login / register / refresh
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes. Réessayez dans quelques minutes.' }
});

function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      fullName: user.full_name,
      tokenType: 'access'
    },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN }
  );
}

function generateRawRefreshToken(userId, tokenId) {
  return jwt.sign(
    {
      sub: userId,
      jti: tokenId,
      tokenType: 'refresh'
    },
    REFRESH_SECRET,
    { expiresIn: `${REFRESH_DAYS}d` }
  );
}

async function issueTokenPair(client, user, req, previousTokenId = null) {
  const tokenId = crypto.randomUUID();
  const rawRefreshToken = generateRawRefreshToken(user.id, tokenId);
  const tokenHash = hashToken(rawRefreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000);
  const ipAddress = req.ip || null;
  const deviceInfo = req.get('user-agent') || null;

  await client.query(
    `INSERT INTO refresh_tokens (id, user_id, token_hash, device_info, ip_address, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [tokenId, user.id, tokenHash, deviceInfo, ipAddress, expiresAt]
  );

  if (previousTokenId) {
    await client.query(
      `UPDATE refresh_tokens
       SET revoked_at = NOW(), replaced_by_id = $1
       WHERE id = $2`,
      [tokenId, previousTokenId]
    );
  }

  const accessToken = signAccessToken(user);
  return {
    accessToken,
    refreshToken: rawRefreshToken,
    expiresIn: ACCESS_EXPIRES_IN
  };
}

// Middleware d'authentification pour les routes protégées
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Jeton d’authentification manquant ou invalide.' });
  }

  const token = authHeader.slice(7).trim();
  try {
    const payload = jwt.verify(token, ACCESS_SECRET);
    if (payload.tokenType !== 'access') {
      return res.status(401).json({ error: 'Type de jeton invalide.' });
    }
    req.user = { id: payload.sub, fullName: payload.fullName };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Jeton expiré ou invalide.' });
  }
}

// POST /api/auth/register
router.post('/register', authLimiter, async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      fullName,
      username,
      email,
      phone,
      password,
      city,
      country,
      preferredLanguage
    } = req.body;

    if (!fullName || !password || (!email && !phone)) {
      return res.status(400).json({
        error: 'fullName, password et au moins un email ou un téléphone sont requis.'
      });
    }

    if (String(password).length < 8) {
      return res.status(400).json({
        error: 'Le mot de passe doit contenir au moins 8 caractères.'
      });
    }

    const cleanName = String(fullName).trim();
    const cleanUsername = username ? String(username).trim().toLowerCase() : null;
    const cleanEmail = email ? String(email).trim().toLowerCase() : null;
    const cleanPhone = phone ? String(phone).trim() : null;

    await client.query('BEGIN');

    const dupCheck = await client.query(
      `SELECT id FROM users
       WHERE ($1::text IS NOT NULL AND email = $1)
          OR ($2::text IS NOT NULL AND phone = $2)
          OR ($3::text IS NOT NULL AND username = $3)
       LIMIT 1`,
      [cleanEmail, cleanPhone, cleanUsername]
    );

    if (dupCheck.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({
        error: 'Un compte existe déjà avec cet e-mail, ce téléphone ou ce nom d’utilisateur.'
      });
    }

    const passwordHash = await bcrypt.hash(String(password), 12);

    const { rows } = await client.query(
      `INSERT INTO users (
         full_name, username, email, phone, password_hash,
         city, country, preferred_language
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, full_name, username, email, phone, avatar_url, cover_url,
                 bio, city, country, preferred_language, low_data_mode, is_verified, created_at`,
      [
        cleanName,
        cleanUsername,
        cleanEmail,
        cleanPhone,
        passwordHash,
        city ? String(city).trim() : null,
        country ? String(country).trim() : null,
        preferredLanguage ? String(preferredLanguage).trim().toLowerCase() : 'fr'
      ]
    );

    const user = rows[0];
    const tokens = await issueTokenPair(client, user, req);

    await client.query('COMMIT');

    return res.status(201).json({
      user,
      ...tokens
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erreur inscription:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  } finally {
    client.release();
  }
});

// POST /api/auth/login (identifiant = email, phone ou username)
router.post('/login', authLimiter, async (req, res) => {
  const client = await pool.connect();
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        error: 'L’identifiant (e-mail ou téléphone) et le mot de passe sont requis.'
      });
    }

    const cleanId = String(identifier).trim();

    const { rows } = await client.query(
      `SELECT id, full_name, username, email, phone, password_hash,
              avatar_url, cover_url, bio, city, country,
              preferred_language, low_data_mode, is_verified, is_active, created_at
       FROM users
       WHERE LOWER(email) = LOWER($1)
          OR phone = $1
          OR LOWER(username) = LOWER($1)
       LIMIT 1`,
      [cleanId]
    );

    const user = rows[0];
    if (!user || !user.is_active) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    const isValid = await bcrypt.compare(String(password), user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    delete user.password_hash;

    await client.query('BEGIN');
    await client.query('UPDATE users SET last_seen_at = NOW() WHERE id = $1', [user.id]);
    const tokens = await issueTokenPair(client, user, req);
    await client.query('COMMIT');

    return res.json({
      user,
      ...tokens
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erreur connexion:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  } finally {
    client.release();
  }
});

// POST /api/auth/refresh (rotation sécurisée du refresh token)
router.post('/refresh', authLimiter, async (req, res) => {
  const client = await pool.connect();
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'refreshToken est requis.' });
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, REFRESH_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Refresh token expiré ou invalide.' });
    }

    if (payload.tokenType !== 'refresh' || !payload.jti) {
      return res.status(401).json({ error: 'Type de refresh token invalide.' });
    }

    const tokenHash = hashToken(refreshToken);

    await client.query('BEGIN');

    const { rows: tokenRows } = await client.query(
      `SELECT id, user_id, token_hash, revoked_at, expires_at
       FROM refresh_tokens
       WHERE id = $1
       FOR UPDATE`,
      [payload.jti]
    );

    const stored = tokenRows[0];
    if (!stored || stored.token_hash !== tokenHash) {
      await client.query('ROLLBACK');
      return res.status(401).json({ error: 'Refresh token introuvable.' });
    }

    // Détection de réutilisation d'un token déjà révoqué -> révocation globale par sécurité
    if (stored.revoked_at) {
      await client.query(
        'UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL',
        [stored.user_id]
      );
      await client.query('COMMIT');
      return res.status(401).json({
        error: 'Token déjà utilisé. Toutes les sessions ont été révoquées par sécurité.'
      });
    }

    if (new Date(stored.expires_at) <= new Date()) {
      await client.query(
        'UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = $1',
        [stored.id]
      );
      await client.query('COMMIT');
      return res.status(401).json({ error: 'Refresh token expiré.' });
    }

    const { rows: userRows } = await client.query(
      `SELECT id, full_name, username, email, phone, avatar_url, cover_url,
              bio, city, country, preferred_language, low_data_mode, is_verified, is_active
       FROM users
       WHERE id = $1`,
      [stored.user_id]
    );

    const user = userRows[0];
    if (!user || !user.is_active) {
      await client.query('ROLLBACK');
      return res.status(401).json({ error: 'Compte utilisateur indisponible.' });
    }

    const tokens = await issueTokenPair(client, user, req, stored.id);
    await client.query('COMMIT');

    return res.json({
      user,
      ...tokens
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erreur refresh:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  } finally {
    client.release();
  }
});

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      await pool.query(
        `UPDATE refresh_tokens
         SET revoked_at = NOW()
         WHERE token_hash = $1 AND revoked_at IS NULL`,
        [tokenHash]
      );
    }
    return res.json({ message: 'Déconnexion réussie.' });
  } catch (err) {
    console.error('Erreur déconnexion:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, full_name, username, email, phone, avatar_url, cover_url,
              bio, city, country, preferred_language, low_data_mode,
              email_verified, phone_verified, is_verified, created_at
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }

    return res.json({ user: rows[0] });
  } catch (err) {
    console.error('Erreur récupération profil:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

module.exports = { authRouter: router, requireAuth };