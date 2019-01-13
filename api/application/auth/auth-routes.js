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
        handler: controller.getToken,
        config: {
          validate: {
            payload: {
              email: Joi.string()
                .email()
                .required(),
              password: Joi.string().required(),
            },
          },
        },
      },
      {
        method: 'POST',
        path: '/auth/verify-token',
        handler: controller.verifyToken,
        config: {
          auth: {
            strategies: ['jwt'],
          },
          validate: {
            payload: {
              token: Joi.string().required(),
            },
          },
        },
      },
    ]);
  },
};
