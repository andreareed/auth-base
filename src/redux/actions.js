import client from '../client';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const VERIFY_TOKEN = 'VERIFY_TOKEN';
export const LOGOUT_USER = 'LOGOUT_USER';

export const registerUser = payload => ({
  type: REGISTER_USER,
  promise: client.post('/users', payload),
});

export const loginUser = payload => ({
  type: LOGIN_USER,
  promise: client.post('/auth/token', payload),
});

export const verifyToken = token => ({
  type: VERIFY_TOKEN,
  promise: client.post('/auth/verify-token', { token }),
});

export const logout = () => ({ type: LOGOUT_USER });
