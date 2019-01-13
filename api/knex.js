const config = require('./config');

const options = {
  debug: true,
  client: 'pg',
  connection: config[config.env].db.connection,
};

module.exports = require('knex')(options);
