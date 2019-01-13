import client from '../client';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = payload => ({
  type: REGISTER_USER,
  promise: client.post('users', payload),
});

export const loginUser = payload => ({
  type: LOGIN_USER,
  promise: client.post('auth/token', payload),
});
