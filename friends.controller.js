const { pool, memoryStore, getIsPostgresConnected } = require('../config/db');

exports.listFriends = async (req, res) => {
  const userId = req.user.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const query = `
        SELECT u.id, u.full_name, u.username, u.avatar_url, u.city, u.country, u.is_verified, f.updated_at AS friend_since
        FROM friendships f
        JOIN users u ON (
          CASE WHEN f.requester_id = $1 THEN f.addressee_id ELSE f.requester_id END = u.id
        )
        WHERE (f.requester_id = $1 OR f.addressee_id = $1)
          AND f.status = 'accepted'
        ORDER BY f.updated_at DESC
      `;
      const { rows } = await pool.query(query, [userId]);
      return res.json({ friends: rows });
    } else {
      const accepted = memoryStore.friendships.filter(
        (f) => (f.requester_id === userId || f.addressee_id === userId) && f.status === 'accepted'
      );
      const friends = accepted.map((f) => {
        const friendId = f.requester_id === userId ? f.addressee_id : f.requester_id;
        const u = memoryStore.users.find((user) => user.id === friendId) || {
          id: friendId,
          full_name: 'Ami AfriBook',
          username: 'ami',
          avatar_url: null,
          city: 'Dakar',
          country: 'Sénégal',
          is_verified: false
        };
        return {
          id: u.id,
          full_name: u.full_name,
          username: u.username,
          avatar_url: u.avatar_url,
          city: u.city,
          country: u.country,
          is_verified: u.is_verified,
          friend_since: f.created_at || new Date()
        };
      });
      return res.json({ friends });
    }
  } catch (err) {
    console.error('Erreur listFriends:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération des amis.' });
  }
};

exports.listPendingRequests = async (req, res) => {
  const userId = req.user.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const query = `
        SELECT u.id, u.full_name, u.username, u.avatar_url, u.city, u.country, f.created_at
        FROM friendships f
        JOIN users u ON f.requester_id = u.id
        WHERE f.addressee_id = $1 AND f.status = 'pending'
        ORDER BY f.created_at DESC
      `;
      const { rows } = await pool.query(query, [userId]);
      return res.json({ requests: rows });
    } else {
      const pending = memoryStore.friendships.filter(
        (f) => f.addressee_id === userId && f.status === 'pending'
      );
      const requests = pending.map((f) => {
        const u = memoryStore.users.find((user) => user.id === f.requester_id) || {
          id: f.requester_id,
          full_name: 'Utilisateur',
          username: 'user',
          avatar_url: null
        };
        return {
          id: u.id,
          full_name: u.full_name,
          username: u.username,
          avatar_url: u.avatar_url,
          city: u.city,
          country: u.country,
          created_at: f.created_at || new Date()
        };
      });
      return res.json({ requests });
    }
  } catch (err) {
    console.error('Erreur listPendingRequests:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération des demandes.' });
  }
};

exports.sendRequest = async (req, res) => {
  const requesterId = req.user.id;
  const addresseeId = req.params.id;

  if (requesterId === addresseeId) {
    return res.status(400).json({ error: 'Vous ne pouvez pas vous ajouter vous-même.' });
  }

  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      await pool.query(
        `INSERT INTO friendships (requester_id, addressee_id, status)
         VALUES ($1, $2, 'pending')
         ON CONFLICT (requester_id, addressee_id) 
         DO UPDATE SET status = 'pending', updated_at = NOW()`,
        [requesterId, addresseeId]
      );
      return res.json({ message: 'Demande d’ami envoyée.' });
    } else {
      const existing = memoryStore.friendships.find(
        (f) =>
          (f.requester_id === requesterId && f.addressee_id === addresseeId) ||
          (f.requester_id === addresseeId && f.addressee_id === requesterId)
      );
      if (existing) {
        existing.status = 'pending';
      } else {
        memoryStore.friendships.push({
          requester_id: requesterId,
          addressee_id: addresseeId,
          status: 'pending',
          created_at: new Date()
        });
      }
      return res.json({ message: 'Demande d’ami envoyée.' });
    }
  } catch (err) {
    console.error('Erreur sendRequest:', err);
    return res.status(500).json({ error: 'Erreur lors de l’envoi de la demande.' });
  }
};

exports.acceptRequest = async (req, res) => {
  const addresseeId = req.user.id;
  const requesterId = req.params.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      await pool.query(
        `UPDATE friendships 
         SET status = 'accepted', updated_at = NOW()
         WHERE requester_id = $1 AND addressee_id = $2`,
        [requesterId, addresseeId]
      );
      return res.json({ message: 'Demande d’ami acceptée.' });
    } else {
      const f = memoryStore.friendships.find(
        (item) => item.requester_id === requesterId && item.addressee_id === addresseeId
      );
      if (f) f.status = 'accepted';
      return res.json({ message: 'Demande d’ami acceptée.' });
    }
  } catch (err) {
    console.error('Erreur acceptRequest:', err);
    return res.status(500).json({ error: 'Erreur lors de l’acceptation de la demande.' });
  }
};

exports.declineRequest = async (req, res) => {
  const addresseeId = req.user.id;
  const requesterId = req.params.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      await pool.query(
        `DELETE FROM friendships WHERE requester_id = $1 AND addressee_id = $2`,
        [requesterId, addresseeId]
      );
      return res.json({ message: 'Demande refusée.' });
    } else {
      const idx = memoryStore.friendships.findIndex(
        (item) => item.requester_id === requesterId && item.addressee_id === addresseeId
      );
      if (idx !== -1) memoryStore.friendships.splice(idx, 1);
      return res.json({ message: 'Demande refusée.' });
    }
  } catch (err) {
    console.error('Erreur declineRequest:', err);
    return res.status(500).json({ error: 'Erreur lors du refus de la demande.' });
  }
};
