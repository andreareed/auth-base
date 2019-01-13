const User = require('./User');

module.exports = {
  async findById(id) {
    return User.query().findById(id);
  },

  async findByEmail(email) {
    return User.query().findOne({ email });
  },

  async registerUser(data) {
    return User.query().insertAndFetch(data);
  },

  async login(username, password) {},
};
