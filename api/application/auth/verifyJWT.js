const userService = require('../user/user-service');

const validate = async (decoded, request) => {
  try {
    const user = await userService.findById(decoded.id);

    if (!user) {
      throw new Error(`User ${decoded.sub} not found`);
    }

    const isVerified = !!user;

    const credentials = {
      ...decoded,
      effectiveId: user.id,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      scope: [
        ...(isVerified ? ['verified'] : []),
        `user-${user.id}`,
        //Example: ...user.posts.map(post => `post-${post.id}`),
      ],
    };

    return { isValid: true, credentials };
  } catch (e) {
    logger.log('error', e);
    return { isValid: false };
  }
};

module.exports = validate;
