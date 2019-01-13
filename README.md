# Auth Base

### Jump Start your App!

The initial setup of a full stack app can be time consuming. Auth Base was created to alleviate much of that boilerplate work. Build with [Create React App](https://facebook.github.io/create-react-app/), Auth Base runs on [Hapi](https://hapijs.com/) and comes preconfigured to work with [Knex.js](https://knexjs.org/) and [Objection.js](http://vincit.github.io/objection.js/) on a PostgreSQL database. It includes register, login, and logout functions, as well as authenticating users via JSON web tokens. A number of other things such as [Redux](https://redux.js.org/), [Redux Thunk](https://github.com/reduxjs/redux-thunk), and [React Router](https://reacttraining.com/react-router/web/guides/quick-start) have been included as well, to make life easier and get you up and running faster.

## Getting Started

Fork and clone this repo, then run `npm install` or `yarn install`.

#### Add the `env` File

First you'll want to create a `.env` file in the root directory. `.env.sample` has been provided to you as a guide, but you may choose to simply rename this file to `.env` if you don't want to make a new one.

You'll need to provide the credentials for your PostgreSQL database in `.env`. You can use a connection string or fill out the credentials separately. Whatever you choose, you will need to ensure it matches up with `/api/config.js`. The default config uses the separate credentials in a dev environment, and a connection string for production. This was intended to provide an example of both configurations.

For JSON web tokens to work properly, don't forget to include a 256 bit secret for `JWT_SECRET`.

#### Create your users table

A Knex migration file has been included to generate a users table with some standard columns. You can edit this file to suite your needs, or delete it entirely and create your own.

Run the migration with Knex. If you entered everything correctly, you should now have a users table!

**Note: If you are using the included routes, you will likely need to update the route validation if you alter the user table.**

#### Spin It Up!

Start the server with `nodemon` and then run `npm start` or `yarn start`. Navigate to `http://localhost:3000/` to see the welcome page.

![Welcome Page](https://s3-us-west-1.amazonaws.com/codereed/git-repo-images/AuthBaseWelcome.png)

## HTTP Requests

[Redux Thunk](https://github.com/reduxjs/redux-thunk) has been configured to allow HTTP requests to be sent via Redux actions.

[Synapse Studios](https://synapsestudios.com/) created the nifty [fetch client](https://github.com/synapsestudios/fetch-client#readme) that is used in Auth Base. It has been outfitted with middleware that takes each HTTP request made in a Redux action and automatically dispatches the action with the corresponding status added to the end.

The following action will dispatch `REGISTER_USER_REQUEST` immediately:

```
export const registerUser = payload => ({
  type: REGISTER_USER,
  promise: client.post('users', payload),
});
```

Once a response is received, the applicable `REGISTER_USER_SUCCESS` or `REGISTER_USER_FAILURE` will be dispatched.

### Authentication and Route Security

Auth Base has been configured to send the user's token with each HTTP request when it is available, making it easy to secure routes.

If you need to secure a route, add the JSON web token strategy to the route's config:

```
auth: {
  strategies: ['jwt'],
}
```

This ensures that all HTTP requests sent without a token will receive a 401 response. Because of this, you should never include this on login or registration endpoints where the end user will not yet have a token.

You can further secure routes by adding scope to them. The initial setup for this is done in `/api/auth/verifyJWT` in the `credentials` object. In the `credentials.scope` array, you can add as many types of scopes as you need. The default scope verifies that the user exists and is authorized to access their own user information (`user-${user.id}`). This can ensures users are barred from doing things like changing _someone else's_ email address.

To use a scope (or scopes) in a route after you have added them to `verifyJWT`, amend the `auth` section of the route with the scope:

```
auth: {
  strategies: ['jwt'],
  scope: ['user-{params.userId}'],
}
```

This tells Hapi to not only check for the bearer token, but to confirm that the userId param matches this specific user. You can also create scopes for things like admin features:

```
// Add admin to credentials object
const credentials = {
  ...decoded,
  effectiveId: user.id,
  user: {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    is_admin: user.is_admin,
  },
  scope: [
    ...(isVerified ? ['verified'] : []),
    `user-${user.id}`,
    ...(user.is_admin ? ['admin'] : []),
  ],
};

// Check authenticated users for admin level scope
auth: {
  strategies: ['jwt'],
  scope: ['admin'],
}
```

### Endpoint Testing

If you're testing endpoints externally, you'll need to include your token in requests to secured endpoints. Include an `Authorization` header with the value `Bearer yourTokenHere`. Note that Auth Base adds /api by default, so the full endpoint will be something like `http://localhost:9000/api/users`.

## Forms

Basic registration and login components have been included and can customized or replaced to suite your needs. The provided forms are build with
[Formik](https://jaredpalmer.com/formik) and use [Yup](https://github.com/jquense/yup) for object validation.
