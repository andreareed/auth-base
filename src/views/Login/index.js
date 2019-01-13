import { connect } from 'react-redux';
import Login from './Login';

import { loginUser } from '../../redux/actions';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: values => dispatch(loginUser(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
