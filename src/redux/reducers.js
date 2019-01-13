import { combineReducers } from 'redux';

const loading = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  user,
});
