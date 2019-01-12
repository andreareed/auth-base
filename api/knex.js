const config = require('./config');

const options = {
  client: 'pg',
  connection: config[config.env].db.connection,
};

module.exports = require('knex')(options);
