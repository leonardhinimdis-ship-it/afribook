const crypto = require('crypto');
const { pool, memoryStore, getIsPostgresConnected } = require('../config/db');

exports.getFeed = async (req, res) => {
  const currentUserId = req.user ? req.user.id : null;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const query = `
        SELECT 
          p.id, p.content, p.media_url, p.media_low_data_url, p.media_type, p.visibility, p.created_at,
          u.id AS author_id, u.full_name AS author_name, u.username AS author_username,
          u.avatar_url AS author_avatar, u.is_verified AS author_verified,
          g.id AS group_id, g.name AS group_name,
          COALESCE(r.reaction_count, 0)::int AS reactions_count,
          COALESCE(c.comment_count, 0)::int AS comments_count,
          my_r.reaction_type AS user_reaction
        FROM posts p
        JOIN users u ON p.author_id = u.id
        LEFT JOIN groups g ON p.group_id = g.id
        LEFT JOIN (
          SELECT post_id, COUNT(*) AS reaction_count 
          FROM post_reactions 
          GROUP BY post_id
        ) r ON p.id = r.post_id
        LEFT JOIN (
          SELECT post_id, COUNT(*) AS comment_count 
          FROM comments 
          GROUP BY post_id
        ) c ON p.id = c.post_id
        LEFT JOIN post_reactions my_r ON p.id = my_r.post_id AND my_r.user_id = $1
        WHERE p.visibility = 'public' OR p.author_id = $1
        ORDER BY p.created_at DESC
        LIMIT 50
      `;
      const { rows } = await pool.query(query, [currentUserId]);
      return res.json({ posts: rows });
    } else {
      // Memory Store
      const postsWithDetails = memoryStore.posts.map((p) => {
        const author = memoryStore.users.find((u) => u.id === p.author_id) || {
          id: p.author_id,
          full_name: 'Utilisateur AfriBook',
          username: 'user',
          avatar_url: null,
          is_verified: false
        };
        const group = p.group_id
          ? memoryStore.groups.find((g) => g.id === p.group_id)
          : null;
        const reactions = memoryStore.reactions.filter((r) => r.post_id === p.id);
        const myReaction = currentUserId
          ? reactions.find((r) => r.user_id === currentUserId)
          : null;
        const comments = memoryStore.comments.filter((c) => c.post_id === p.id);

        return {
          id: p.id,
          content: p.content,
          media_url: p.media_url,
          media_low_data_url: p.media_low_data_url,
          media_type: p.media_type,
          visibility: p.visibility || 'public',
          created_at: p.created_at,
          author_id: author.id,
          author_name: author.full_name,
          author_username: author.username,
          author_avatar: author.avatar_url,
          author_verified: !!author.is_verified,
          group_id: group ? group.id : null,
          group_name: group ? group.name : null,
          reactions_count: reactions.length,
          comments_count: comments.length,
          user_reaction: myReaction ? myReaction.reaction_type : null
        };
      });

      postsWithDetails.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return res.json({ posts: postsWithDetails });
    }
  } catch (err) {
    console.error('Erreur getFeed:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération du fil.' });
  }
};

exports.createPost = async (req, res) => {
  const authorId = req.user.id;
  const { content, media_url, media_low_data_url, media_type, visibility, group_id } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Le contenu de la publication ne peut pas être vide.' });
  }

  const cleanContent = content.trim();
  const cleanVisibility = visibility || 'public';
  const cleanMediaType = media_type || (media_url ? 'image' : null);

  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const { rows } = await pool.query(
        `INSERT INTO posts (author_id, group_id, content, media_url, media_low_data_url, media_type, visibility)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [authorId, group_id || null, cleanContent, media_url || null, media_low_data_url || null, cleanMediaType, cleanVisibility]
      );

      return res.status(201).json({ post: rows[0], message: 'Publication créée avec succès.' });
    } else {
      const newPost = {
        id: crypto.randomUUID(),
        author_id: authorId,
        group_id: group_id || null,
        content: cleanContent,
        media_url: media_url || null,
        media_low_data_url: media_low_data_url || null,
        media_type: cleanMediaType,
        visibility: cleanVisibility,
        created_at: new Date()
      };
      memoryStore.posts.unshift(newPost);

      const author = memoryStore.users.find((u) => u.id === authorId);
      const postWithAuthor = {
        ...newPost,
        author_name: author ? author.full_name : 'Moi',
        author_username: author ? author.username : 'me',
        author_avatar: author ? author.avatar_url : null,
        author_verified: author ? author.is_verified : false,
        reactions_count: 0,
        comments_count: 0,
        user_reaction: null
      };

      return res.status(201).json({ post: postWithAuthor, message: 'Publication créée avec succès.' });
    }
  } catch (err) {
    console.error('Erreur createPost:', err);
    return res.status(500).json({ error: 'Erreur lors de la création de la publication.' });
  }
};

exports.toggleReaction = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const { reactionType = 'like' } = req.body;

  const validTypes = ['like', 'love', 'support', 'haha', 'wow', 'sad'];
  if (!validTypes.includes(reactionType)) {
    return res.status(400).json({ error: 'Type de réaction non valide.' });
  }

  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      // Check existing
      const existing = await pool.query(
        'SELECT reaction_type FROM post_reactions WHERE post_id = $1 AND user_id = $2',
        [postId, userId]
      );

      if (existing.rows.length > 0) {
        if (existing.rows[0].reaction_type === reactionType) {
          // Toggle off
          await pool.query('DELETE FROM post_reactions WHERE post_id = $1 AND user_id = $2', [postId, userId]);
          return res.json({ reaction: null, removed: true });
        } else {
          // Update type
          await pool.query(
            'UPDATE post_reactions SET reaction_type = $1 WHERE post_id = $2 AND user_id = $3',
            [reactionType, postId, userId]
          );
          return res.json({ reaction: reactionType, updated: true });
        }
      } else {
        // Insert new
        await pool.query(
          'INSERT INTO post_reactions (post_id, user_id, reaction_type) VALUES ($1, $2, $3)',
          [postId, userId, reactionType]
        );
        return res.json({ reaction: reactionType, added: true });
      }
    } else {
      const idx = memoryStore.reactions.findIndex((r) => r.post_id === postId && r.user_id === userId);
      if (idx !== -1) {
        if (memoryStore.reactions[idx].reaction_type === reactionType) {
          memoryStore.reactions.splice(idx, 1);
          return res.json({ reaction: null, removed: true });
        } else {
          memoryStore.reactions[idx].reaction_type = reactionType;
          return res.json({ reaction: reactionType, updated: true });
        }
      } else {
        memoryStore.reactions.push({ post_id: postId, user_id: userId, reaction_type: reactionType });
        return res.json({ reaction: reactionType, added: true });
      }
    }
  } catch (err) {
    console.error('Erreur toggleReaction:', err);
    return res.status(500).json({ error: 'Erreur lors de la réaction.' });
  }
};

exports.getComments = async (req, res) => {
  const postId = req.params.id;
  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const { rows } = await pool.query(
        `SELECT c.id, c.content, c.parent_comment_id, c.created_at,
                u.id AS author_id, u.full_name AS author_name, u.username AS author_username,
                u.avatar_url AS author_avatar
         FROM comments c
         JOIN users u ON c.author_id = u.id
         WHERE c.post_id = $1
         ORDER BY c.created_at ASC`,
        [postId]
      );
      return res.json({ comments: rows });
    } else {
      const comments = memoryStore.comments
        .filter((c) => c.post_id === postId)
        .map((c) => {
          const author = memoryStore.users.find((u) => u.id === c.author_id) || {
            full_name: 'Anonyme',
            username: 'anon',
            avatar_url: null
          };
          return {
            ...c,
            author_name: author.full_name,
            author_username: author.username,
            author_avatar: author.avatar_url
          };
        });
      return res.json({ comments });
    }
  } catch (err) {
    console.error('Erreur getComments:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération des commentaires.' });
  }
};

exports.addComment = async (req, res) => {
  const authorId = req.user.id;
  const postId = req.params.id;
  const { content, parent_comment_id } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Le commentaire ne peut pas être vide.' });
  }

  const isPg = getIsPostgresConnected();

  try {
    if (isPg) {
      const { rows } = await pool.query(
        `INSERT INTO comments (post_id, author_id, parent_comment_id, content)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [postId, authorId, parent_comment_id || null, content.trim()]
      );

      const comment = rows[0];
      const authorRes = await pool.query('SELECT full_name, username, avatar_url FROM users WHERE id = $1', [authorId]);
      const author = authorRes.rows[0];

      return res.status(201).json({
        comment: {
          ...comment,
          author_name: author.full_name,
          author_username: author.username,
          author_avatar: author.avatar_url
        }
      });
    } else {
      const author = memoryStore.users.find((u) => u.id === authorId);
      const newComment = {
        id: crypto.randomUUID(),
        post_id: postId,
        author_id: authorId,
        parent_comment_id: parent_comment_id || null,
        content: content.trim(),
        created_at: new Date(),
        author_name: author ? author.full_name : 'Moi',
        author_username: author ? author.username : 'me',
        author_avatar: author ? author.avatar_url : null
      };

      memoryStore.comments.push(newComment);
      return res.status(201).json({ comment: newComment });
    }
  } catch (err) {
    console.error('Erreur addComment:', err);
    return res.status(500).json({ error: 'Erreur lors de l’ajout du commentaire.' });
  }
};
