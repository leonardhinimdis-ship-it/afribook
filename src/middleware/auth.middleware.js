const jwt = require('jsonwebtoken');
const env = require('../config/env');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Jeton d’authentification manquant ou invalide.' });
  }

  const token = authHeader.slice(7).trim();
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
    if (payload.tokenType !== 'access') {
      return res.status(401).json({ error: 'Type de jeton invalide (attendu: access).' });
    }
    req.user = {
      id: payload.sub,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone
    };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Jeton expiré ou invalide.' });
  }
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.slice(7).trim();
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
    if (payload.tokenType === 'access') {
      req.user = {
        id: payload.sub,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone
      };
    }
  } catch (err) {
    // Ignore invalid optional token
  }
  return next();
}

module.exports = {
  requireAuth,
  optionalAuth
};
