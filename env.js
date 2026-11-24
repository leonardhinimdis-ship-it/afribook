require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/afribook',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'afribook_access_secret_super_secure_key_2026',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'afribook_refresh_secret_super_secure_key_2026',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  JWT_REFRESH_DAYS: Number(process.env.JWT_REFRESH_DAYS || 30),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:4000'
};
