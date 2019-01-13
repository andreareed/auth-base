require('dotenv').config();
const JWT = require('jsonwebtoken');
const uuid = require('uuid');
const Boom = require('boom');
const bcrypt = require('bcrypt');
const userService = require('../user/user-service');

module.exports = {
  async getToken(request) {
    const { email, password } = request.payload;
    const invalidUserError = Boom.badRequest('Incorrect email address or password');
    let user = await userService.findByEmail(email);

    if (!user) {
      return invalidUserError;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return invalidUserError;
    }

    user.token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '36h',
    });
    delete user.password;

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
