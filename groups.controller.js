const crypto = require('crypto');
const { pool, memoryStore, getIsPostgresConnected } = require('../config/db');

exports.listGroups = async (req, res) => {
  const isPg = getIsPostgresConnected();
  const { category, search } = req.query;

  try {
    if (isPg) {
      let query = `
        SELECT g.*, 
               u.full_name AS owner_name,
               COUNT(gm.user_id)::int AS members_count
        FROM groups g
        JOIN users u ON g.owner_id = u.id
        LEFT JOIN group_members gm ON g.id = gm.group_id
        WHERE 1=1
      `;
      const params = [];

      if (category) {
        params.push(category);
        query += ` AND g.category = $${params.length}`;
      }
      if (search) {
        params.push(`%${search.trim()}%`);
        query += ` AND (g.name ILIKE $${params.length} OR g.description ILIKE $${params.length})`;
      }

      query += ` GROUP BY g.id, u.full_name ORDER BY members_count DESC`;
      const { rows } = await pool.query(query, params);
      return res.json({ groups: rows });
    } else {
      let groups = memoryStore.groups.map((g) => {
        const owner = memoryStore.users.find((u) => u.id === g.owner_id);
        return {
          ...g,
          owner_name: owner ? owner.full_name : 'Admin'
        };
      });

      if (category) {
        groups = groups.filter((g) => g.category && g.category.toLowerCase().includes(category.toLowerCase()));
      }
      if (search) {
        const term = search.toLowerCase();
        groups = groups.filter((g) => g.name.toLowerCase().includes(term) || (g.description && g.description.toLowerCase().includes(term)));
      }

      return res.json({ groups });
    }
  } catch (err) {
    console.error('Erreur listGroups:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération des groupes.' });
  }
};

exports.getGroupById = async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user ? req.user.id : null;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const { rows } = await pool.query(
        `SELECT g.*, u.full_name AS owner_name,
                COUNT(gm.user_id)::int AS members_count,
                my_m.role AS user_role
         FROM groups g
         JOIN users u ON g.owner_id = u.id
         LEFT JOIN group_members gm ON g.id = gm.group_id
         LEFT JOIN group_members my_m ON g.id = my_m.group_id AND my_m.user_id = $2
         WHERE g.id = $1
         GROUP BY g.id, u.full_name, my_m.role`,
        [groupId, userId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Groupe introuvable.' });
      }

      return res.json({ group: rows[0] });
    } else {
      const group = memoryStore.groups.find((g) => g.id === groupId);
      if (!group) return res.status(404).json({ error: 'Groupe introuvable.' });

      const owner = memoryStore.users.find((u) => u.id === group.owner_id);
      return res.json({
        group: {
          ...group,
          owner_name: owner ? owner.full_name : 'Admin',
          user_role: group.owner_id === userId ? 'admin' : 'member'
        }
      });
    }
  } catch (err) {
    console.error('Erreur getGroupById:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération du groupe.' });
  }
};

exports.createGroup = async (req, res) => {
  const ownerId = req.user.id;
  const { name, description, category, city, country, privacy, cover_url } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Le nom du groupe est requis.' });
  }

  const cleanName = name.trim();
  const slug = cleanName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);

  const cleanPrivacy = privacy === 'private' ? 'private' : 'public';
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const { rows } = await client.query(
          `INSERT INTO groups (owner_id, name, slug, description, category, city, country, privacy, cover_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING *`,
          [ownerId, cleanName, slug, description || null, category || 'Général', city || null, country || null, cleanPrivacy, cover_url || null]
        );
        const group = rows[0];

        // Ajouter le créateur comme admin
        await client.query(
          `INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, 'admin')`,
          [group.id, ownerId]
        );

        await client.query('COMMIT');
        return res.status(201).json({ group, message: 'Groupe créé avec succès.' });
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    } else {
      const newGroup = {
        id: crypto.randomUUID(),
        owner_id: ownerId,
        name: cleanName,
        slug,
        description: description || 'Communauté AfriBook',
        category: category || 'Général',
        city: city || 'Dakar',
        country: country || 'Sénégal',
        privacy: cleanPrivacy,
        cover_url: cover_url || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
        members_count: 1
      };
      memoryStore.groups.unshift(newGroup);
      return res.status(201).json({ group: newGroup, message: 'Groupe créé avec succès.' });
    }
  } catch (err) {
    console.error('Erreur createGroup:', err);
    return res.status(500).json({ error: 'Erreur lors de la création du groupe.' });
  }
};

exports.joinGroup = async (req, res) => {
  const userId = req.user.id;
  const groupId = req.params.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      await pool.query(
        `INSERT INTO group_members (group_id, user_id, role)
         VALUES ($1, $2, 'member')
         ON CONFLICT (group_id, user_id) DO NOTHING`,
        [groupId, userId]
      );
      return res.json({ message: 'Vous avez rejoint le groupe avec succès.' });
    } else {
      const group = memoryStore.groups.find((g) => g.id === groupId);
      if (group) group.members_count = (group.members_count || 1) + 1;
      return res.json({ message: 'Vous avez rejoint le groupe avec succès.' });
    }
  } catch (err) {
    console.error('Erreur joinGroup:', err);
    return res.status(500).json({ error: 'Erreur lors de l’adhésion au groupe.' });
  }
};
