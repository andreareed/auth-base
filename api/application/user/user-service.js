const User = require('./User');

module.exports = {
  async findById(id) {
    return User.query().findById(id);
  },

  async login(username, password) {},
};
