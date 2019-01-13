const config = require('./config');

const options = {
  debug: process.env.DEBUG,
  client: 'pg',
  connection: config[config.env].db.connection,
};

module.exports = require('knex')(options);
