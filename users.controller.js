const { pool, memoryStore, getIsPostgresConnected } = require('../config/db');

exports.getProfile = async (req, res) => {
  const { id } = req.params;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const { rows } = await pool.query(
        `SELECT id, full_name, username, avatar_url, cover_url, bio, city, country,
                preferred_language, low_data_mode, is_verified, created_at
         FROM users
         WHERE id::text = $1 OR username = $1`,
        [id]
      );
      if (rows.length === 0) return res.status(404).json({ error: 'Profil introuvable.' });
      return res.json({ profile: rows[0] });
    } else {
      const user = memoryStore.users.find((u) => u.id === id || u.username === id);
      if (!user) return res.status(404).json({ error: 'Profil introuvable.' });
      const safe = { ...user };
      delete safe.password_hash;
      return res.json({ profile: safe });
    }
  } catch (err) {
    console.error('Erreur getProfile:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération du profil.' });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { full_name, bio, city, country, avatar_url, cover_url, preferred_language, low_data_mode } = req.body;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const { rows } = await pool.query(
        `UPDATE users
         SET full_name = COALESCE($1, full_name),
             bio = COALESCE($2, bio),
             city = COALESCE($3, city),
             country = COALESCE($4, country),
             avatar_url = COALESCE($5, avatar_url),
             cover_url = COALESCE($6, cover_url),
             preferred_language = COALESCE($7, preferred_language),
             low_data_mode = COALESCE($8, low_data_mode),
             updated_at = NOW()
         WHERE id = $9
         RETURNING id, full_name, username, email, phone, avatar_url, cover_url, bio, city, country, preferred_language, low_data_mode, is_verified`,
        [full_name, bio, city, country, avatar_url, cover_url, preferred_language, low_data_mode, userId]
      );
      return res.json({ user: rows[0], message: 'Profil mis à jour avec succès.' });
    } else {
      const user = memoryStore.users.find((u) => u.id === userId);
      if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });
      if (full_name !== undefined) user.full_name = full_name;
      if (bio !== undefined) user.bio = bio;
      if (city !== undefined) user.city = city;
      if (country !== undefined) user.country = country;
      if (avatar_url !== undefined) user.avatar_url = avatar_url;
      if (cover_url !== undefined) user.cover_url = cover_url;
      if (preferred_language !== undefined) user.preferred_language = preferred_language;
      if (low_data_mode !== undefined) user.low_data_mode = low_data_mode;

      const safe = { ...user };
      delete safe.password_hash;
      return res.json({ user: safe, message: 'Profil mis à jour avec succès.' });
    }
  } catch (err) {
    console.error('Erreur updateProfile:', err);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour du profil.' });
  }
};

exports.toggleLowDataMode = async (req, res) => {
  const userId = req.user.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const { rows } = await pool.query(
        `UPDATE users 
         SET low_data_mode = NOT low_data_mode, updated_at = NOW() 
         WHERE id = $1 
         RETURNING id, low_data_mode`,
        [userId]
      );
      return res.json({ low_data_mode: rows[0].low_data_mode });
    } else {
      const user = memoryStore.users.find((u) => u.id === userId);
      if (user) {
        user.low_data_mode = !user.low_data_mode;
        return res.json({ low_data_mode: user.low_data_mode });
      }
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }
  } catch (err) {
    console.error('Erreur toggleLowDataMode:', err);
    return res.status(500).json({ error: 'Erreur lors du basculement du mode Low Data.' });
  }
};

exports.searchUsers = async (req, res) => {
  const { q } = req.query;
  if (!q || !q.trim()) return res.json({ users: [] });

  const term = q.trim();
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const { rows } = await pool.query(
        `SELECT id, full_name, username, avatar_url, city, country, is_verified, bio
         FROM users
         WHERE full_name ILIKE $1 OR username ILIKE $1 OR city ILIKE $1 OR country ILIKE $1
         LIMIT 20`,
        [`%${term}%`]
      );
      return res.json({ users: rows });
    } else {
      const lower = term.toLowerCase();
      const results = memoryStore.users
        .filter(
          (u) =>
            u.full_name.toLowerCase().includes(lower) ||
            (u.username && u.username.toLowerCase().includes(lower)) ||
            (u.city && u.city.toLowerCase().includes(lower)) ||
            (u.country && u.country.toLowerCase().includes(lower))
        )
        .map((u) => {
          const safe = { ...u };
          delete safe.password_hash;
          return safe;
        });
      return res.json({ users: results });
    }
  } catch (err) {
    console.error('Erreur searchUsers:', err);
    return res.status(500).json({ error: 'Erreur lors de la recherche.' });
  }
};
