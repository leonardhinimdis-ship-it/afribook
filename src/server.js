const app = require('./app');
const env = require('./config/env');
const { checkDatabaseConnection } = require('./config/db');

async function startServer() {
  console.log('----------------------------------------------------');
  console.log('🚀 Démarrage du serveur AfriBook...');
  console.log('----------------------------------------------------');

  await checkDatabaseConnection();

  const server = app.listen(env.PORT, () => {
    console.log(`🌍 Serveur AfriBook disponible sur : http://localhost:${env.PORT}`);
    console.log(`📱 Interface Web Frontend        : http://localhost:${env.PORT}`);
    console.log(`🔌 Endpoints API REST             : http://localhost:${env.PORT}/api`);
    console.log('----------------------------------------------------');
  });

  process.on('SIGTERM', () => {
    console.log('Signal SIGTERM reçu. Arrêt gracieux du serveur...');
    server.close(() => {
      console.log('Serveur AfriBook arrêté.');
      process.exit(0);
    });
  });
}

startServer();
