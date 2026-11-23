const crypto = require('crypto');
const { pool, memoryStore, getIsPostgresConnected } = require('../config/db');

exports.listConversations = async (req, res) => {
  const userId = req.user.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const query = `
        WITH last_messages AS (
          SELECT DISTINCT ON (
            LEAST(sender_id, recipient_id),
            GREATEST(sender_id, recipient_id)
          )
            id, sender_id, recipient_id, body, created_at, read_at,
            CASE WHEN sender_id = $1 THEN recipient_id ELSE sender_id END AS contact_id
          FROM messages
          WHERE sender_id = $1 OR recipient_id = $1
          ORDER BY
            LEAST(sender_id, recipient_id),
            GREATEST(sender_id, recipient_id),
            created_at DESC
        )
        SELECT lm.*,
               u.full_name AS contact_name,
               u.username AS contact_username,
               u.avatar_url AS contact_avatar,
               u.is_verified AS contact_verified
        FROM last_messages lm
        JOIN users u ON lm.contact_id = u.id
        ORDER BY lm.created_at DESC
      `;
      const { rows } = await pool.query(query, [userId]);
      return res.json({ conversations: rows });
    } else {
      // Memory Store
      const userMessages = memoryStore.messages.filter(
        (m) => m.sender_id === userId || m.recipient_id === userId
      );

      const conversationsMap = new Map();
      userMessages.forEach((m) => {
        const contactId = m.sender_id === userId ? m.recipient_id : m.sender_id;
        const existing = conversationsMap.get(contactId);
        if (!existing || new Date(m.created_at) > new Date(existing.created_at)) {
          const contact = memoryStore.users.find((u) => u.id === contactId) || {
            full_name: 'Contact',
            username: 'contact',
            avatar_url: null,
            is_verified: false
          };
          conversationsMap.set(contactId, {
            id: m.id,
            contact_id: contactId,
            contact_name: contact.full_name,
            contact_username: contact.username,
            contact_avatar: contact.avatar_url,
            contact_verified: contact.is_verified,
            body: m.body,
            created_at: m.created_at,
            read_at: m.read_at,
            sender_id: m.sender_id,
            recipient_id: m.recipient_id
          });
        }
      });

      const conversations = Array.from(conversationsMap.values()).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return res.json({ conversations });
    }
  } catch (err) {
    console.error('Erreur listConversations:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération des conversations.' });
  }
};

exports.getConversation = async (req, res) => {
  const userId = req.user.id;
  const contactId = req.params.contactId;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      // Marquer comme lus
      await pool.query(
        `UPDATE messages SET read_at = NOW() WHERE recipient_id = $1 AND sender_id = $2 AND read_at IS NULL`,
        [userId, contactId]
      );

      const { rows } = await pool.query(
        `SELECT m.*, u.full_name AS sender_name, u.avatar_url AS sender_avatar
         FROM messages m
         JOIN users u ON m.sender_id = u.id
         WHERE (m.sender_id = $1 AND m.recipient_id = $2)
            OR (m.sender_id = $2 AND m.recipient_id = $1)
         ORDER BY m.created_at ASC`,
        [userId, contactId]
      );

      return res.json({ messages: rows });
    } else {
      memoryStore.messages
        .filter((m) => m.recipient_id === userId && m.sender_id === contactId && !m.read_at)
        .forEach((m) => (m.read_at = new Date()));

      const messages = memoryStore.messages
        .filter(
          (m) =>
            (m.sender_id === userId && m.recipient_id === contactId) ||
            (m.sender_id === contactId && m.recipient_id === userId)
        )
        .map((m) => {
          const sender = memoryStore.users.find((u) => u.id === m.sender_id);
          return {
            ...m,
            sender_name: sender ? sender.full_name : 'Expéditeur',
            sender_avatar: sender ? sender.avatar_url : null
          };
        })
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      return res.json({ messages });
    }
  } catch (err) {
    console.error('Erreur getConversation:', err);
    return res.status(500).json({ error: 'Erreur lors du chargement de la discussion.' });
  }
};

exports.sendMessage = async (req, res) => {
  const senderId = req.user.id;
  const recipientId = req.params.contactId;
  const { body, attachment_url } = req.body;

  if (!body || !body.trim()) {
    return res.status(400).json({ error: 'Le message ne peut pas être vide.' });
  }

  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const { rows } = await pool.query(
        `INSERT INTO messages (sender_id, recipient_id, body, attachment_url)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [senderId, recipientId, body.trim(), attachment_url || null]
      );
      return res.status(201).json({ message: rows[0] });
    } else {
      const newMsg = {
        id: crypto.randomUUID(),
        sender_id: senderId,
        recipient_id: recipientId,
        body: body.trim(),
        attachment_url: attachment_url || null,
        created_at: new Date(),
        delivered_at: new Date(),
        read_at: null
      };
      memoryStore.messages.push(newMsg);
      return res.status(201).json({ message: newMsg });
    }
  } catch (err) {
    console.error('Erreur sendMessage:', err);
    return res.status(500).json({ error: 'Erreur lors de l’envoi du message.' });
  }
};
