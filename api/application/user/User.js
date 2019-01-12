const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get notFoundMessage() {
    return 'Invalid user';
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }
}

module.exports = User;
