const config = require('./config');

const options = {
  debug: config[config.env].db.debug,
  client: 'pg',
  connection: config[config.env].db.connection,
};

module.exports = require('knex')(options);
