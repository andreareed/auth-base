import client from '../client';

export const REGISTER_USER = 'REGISTER_USER';

export const registerUser = payload => ({
  type: REGISTER_USER,
  promise: client.post('users', payload),
});
