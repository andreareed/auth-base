import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import localstorage from 'store2';

import { REGISTER_USER, LOGIN_USER, VERIFY_TOKEN } from './actions';

const loading = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    case `${REGISTER_USER}_SUCCESS`:
      localstorage.set('token', action.json.token);
      return fromJS(action.json);

    case `${LOGIN_USER}_SUCCESS`:
      localstorage.set('token', action.json.token);
      return fromJS(action.json);

    case `${VERIFY_TOKEN}_SUCCESS`:
      localstorage.set('token', action.json.token);
      return fromJS(action.json);

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  user,
});
