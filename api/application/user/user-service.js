const Boom = require('boom');
const User = require('./User');

module.exports = {
  async findById(id) {
    return User.query().findById(id);
  },

  async findByEmail(email) {
    return User.query().findOne({ email: email.toLowerCase() });
  },

  async registerUser(data) {
    return User.query()
      .insertAndFetch(data)
      .catch(err => {
        if (err.constraint) {
          throw Boom.badData('Email already exists');
        } else {
          throw Boom.badImplementation('Opps! Something went wrong.');
        }
      });
  },
};
