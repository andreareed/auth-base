import merge from './common/utils/merge';

const defaults = {};

const environments = {
  development: {
    apiUrl: 'http://localhost:9000/api/',
  },
};

export default merge(defaults, environments[process.env.REACT_APP_ENV]);
