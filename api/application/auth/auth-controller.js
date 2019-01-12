require('dotenv').config();
const JWT = require('jsonwebtoken');
const uuid = require('uuid');
const Boom = require('boom');
const userService = require('../user/user-service');

module.exports = {
  async login(request) {
    const { username, password } = request.payload;
    let user = await userService.login(username, password);

    if (!user) {
      throw Boom.unauthorized('Username or password are incorrect');
    }

    user.token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '36h',
    });
    return user;
  },

  async verifyToken(request) {
    const { token } = request.payload;
    const verified = JWT.verify(token, process.env.JWT_SECRET);

    if (verified) {
      const user = await userService.findById(verified.id);
      user.token = token;
      return user;
    }

    throw Boom.unauthorized('Unable to verify user');
  },
};
