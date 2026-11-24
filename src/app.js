const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');
const friendsRoutes = require('./routes/friends.routes');
const groupsRoutes = require('./routes/groups.routes');
const messagesRoutes = require('./routes/messages.routes');
const notificationsRoutes = require('./routes/notifications.routes');
const marketplaceRoutes = require('./routes/marketplace.routes');
const storiesRoutes = require('./routes/stories.routes');
const { requireAuth } = require('./middleware/auth.middleware');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fichiers statiques Frontend (Single Page App)
app.use(express.static(path.join(__dirname, '../public')));

// Point de contrôle de santé
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'afribook-api',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Route test héritée
app.get('/api/feed/ping', requireAuth, (req, res) => {
  res.json({
    message: `Connexion validée pour ${req.user.fullName}`,
    userId: req.user.id
  });
});

// Routes API REST AfriBook
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/stories', storiesRoutes);

// Route fallback pour Single Page Application
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint API introuvable.' });
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('[Erreur non gérée]:', err);
  res.status(500).json({ error: 'Une erreur interne est survenue sur le serveur.' });
});

module.exports = app;
