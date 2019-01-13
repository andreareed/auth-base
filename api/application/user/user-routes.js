const Joi = require('joi');

const controller = require('./user-controller');

module.exports = {
  name: 'User Routes',
  register: async (server, options) => {
    server.route([
      {
        method: 'POST',
        path: '/users',
        handler: controller.registerUserHandler,
        config: {
          validate: {
            payload: {
              first_name: Joi.string().required(),
              last_name: Joi.string().required(),
              email: Joi.string()
                .email()
                .required(),
              password: Joi.string()
                .min(6)
                .required(),
              confirmPassword: Joi.any()
                .valid(Joi.ref('password'))
                .required(),
            },
          },
        },
      },
    ]);
  },
};
