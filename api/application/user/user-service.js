const User = require('./User');

module.exports = {
  async findById(id) {
    return User.query().findById(id);
  },

  async registerUser(data) {
    return User.query().insertAndFetch(data);
  },

  async login(username, password) {},
};
