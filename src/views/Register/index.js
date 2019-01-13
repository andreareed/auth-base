import { connect } from 'react-redux';
import Register from './Register';

import { registerUser } from '../../redux/actions';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: values => dispatch(registerUser(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
