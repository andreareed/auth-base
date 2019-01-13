const boom = require('boom');
const Joi = require('joi');

const controller = require('./auth-controller');

module.exports = {
  name: 'Auth Routes',
  register: async (server, options) => {
    server.route([
      {
        method: 'POST',
        path: '/auth/token',
        config: {
          validate: {},
        },
        handler: controller.getToken,
      },
      {
        method: 'POST',
        path: '/auth/verify-token',
        config: {
          validate: {},
        },
        handler: controller.verifyToken,
      },
    ]);
  },
};
