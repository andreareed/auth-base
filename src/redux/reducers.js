import { combineReducers } from 'redux';
import { fromJS, Map } from 'immutable';
import store2 from 'store2';

import { REGISTER_USER } from './actions';

const loading = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const user = (state = Map(), action) => {
  switch (action.type) {
    case `${REGISTER_USER}_SUCCESS`:
      store2.set('token', action.json.token);
      return fromJS(action.json);

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  user,
});
