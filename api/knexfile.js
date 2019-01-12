const config = require('./config');

module.exports = {
  client: 'postgresql',
  connection: config[config.env].db.connection,
  seeds: {
    directory: config[config.env].db.seedDirectory,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: config[config.env].db.migrationDirectory,
  },
};
