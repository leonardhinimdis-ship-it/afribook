require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { authRouter, requireAuth } = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'afribook-api' });
});

app.use('/api/auth', authRouter);

app.get('/api/feed/ping', requireAuth, (req, res) => {
  res.json({
    message: `Connexion validée pour ${req.user.fullName}`,
    userId: req.user.id
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur AfriBook lancé sur http://localhost:${PORT}`);
});