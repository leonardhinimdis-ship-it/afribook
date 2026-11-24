const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const env = require('../config/env');

async function initDatabase() {
  console.log('🔄 Initialisation de la base de données PostgreSQL AfriBook...');
  const pool = new Pool({ connectionString: env.DATABASE_URL });

  try {
    const client = await pool.connect();
    console.log('✅ Connecté à PostgreSQL.');

    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const seedsPath = path.join(__dirname, '../../database/seeds.sql');

    console.log('📜 Exécution du schéma SQL (tables, index, triggers)...');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    console.log('✅ Schéma créé avec succès.');

    console.log('🌱 Insertion des données de test (seeds)...');
    const seedsSql = fs.readFileSync(seedsPath, 'utf8');
    await client.query(seedsSql);
    console.log('✅ Données de test insérées avec succès.');

    client.release();
    await pool.end();
    console.log('🎉 Initialisation terminée avec succès !');
  } catch (err) {
    console.error('❌ Erreur lors de l’initialisation de la base de données :', err.message);
    process.exit(1);
  }
}

initDatabase();
