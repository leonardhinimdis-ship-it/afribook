const { pool, memoryStore, getIsPostgresConnected } = require('../config/db');

exports.listNotifications = async (req, res) => {
  const userId = req.user.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const query = `
        SELECT n.*,
               u.full_name AS actor_name,
               u.username AS actor_username,
               u.avatar_url AS actor_avatar
        FROM notifications n
        LEFT JOIN users u ON n.actor_id = u.id
        WHERE n.user_id = $1
        ORDER BY n.created_at DESC
        LIMIT 30
      `;
      const { rows } = await pool.query(query, [userId]);
      return res.json({ notifications: rows });
    } else {
      const userNotifs = memoryStore.notifications
        .filter((n) => n.user_id === userId)
        .map((n) => {
          const actor = memoryStore.users.find((u) => u.id === n.actor_id) || {
            full_name: 'AfriBook',
            username: 'afribook',
            avatar_url: null
          };
          return {
            ...n,
            actor_name: actor.full_name,
            actor_username: actor.username,
            actor_avatar: actor.avatar_url
          };
        })
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      return res.json({ notifications: userNotifs });
    }
  } catch (err) {
    console.error('Erreur listNotifications:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération des notifications.' });
  }
};

exports.markAllAsRead = async (req, res) => {
  const userId = req.user.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      await pool.query('UPDATE notifications SET is_read = TRUE WHERE user_id = $1', [userId]);
      return res.json({ message: 'Toutes les notifications ont été marquées comme lues.' });
    } else {
      memoryStore.notifications
        .filter((n) => n.user_id === userId)
        .forEach((n) => (n.is_read = true));
      return res.json({ message: 'Toutes les notifications ont été marquées comme lues.' });
    }
  } catch (err) {
    console.error('Erreur markAllAsRead:', err);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour des notifications.' });
  }
};
