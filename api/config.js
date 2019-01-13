require('dotenv').config({ path: '../.env' });
const env = process.env.APP_ENV || 'development';
const config = {
  env,
  development: {
    db: {
      connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
      },
      seedDirectory: './seeds/dev',
      migrationDirectory: './database/migrations',
      debug: process.env.DEBUG,
    },
  },
  production: {
    db: {
      seedDirectory: './seeds/prod',
      migrationDirectory: './database/migrations',
      debug: false,
    },
  },
};

module.exports = config;
