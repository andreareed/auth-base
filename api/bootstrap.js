require('dotenv').config();
const validate = require('./application/auth/verifyJWT');

const bootstrap = {
  name: 'bootstrap',
  version: '0.1.0',
  register: async (server, options) => {
    // Register JWT Validation Function
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_SECRET,
      validate,
      verifyOptions: { algorithms: ['HS256'] },
    });

    // rewrite requests from /api/* to /*
    server.ext('onRequest', (request, h) => {
      // allow for the /api prefix
      request.setUrl(request.url.path.replace(/\/api\//, '/'));
      return h.continue;
    });
  },
};

module.exports = bootstrap;
