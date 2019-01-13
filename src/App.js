import React, { Component } from 'react';
import { connect } from 'react-redux';
import localstorage from 'store2';
import logo from './logo.svg';
import Register from './views/Register';
import Login from './views/Login';
import Loading from './common/components/Loading';

import { verifyToken, logout } from './redux/actions';

class App extends Component {
  state = {
    view: 'login',
  };

  componentDidMount() {
    const { user, verifyToken } = this.props;
    if (!user) {
      const token = localstorage.get('token');
      if (token) {
        verifyToken(token).then(action => {
          if (action.response.ok) {
            this.setState({ view: 'success' });
          }
        });
      }
    }
  }

  logout = () => {
    this.props.logout();
    this.setState({ view: 'login' });
  };

  render() {
    const { view } = this.state;
    const { user, loading } = this.props;
    const register = view === 'register' && !loading;
    const login = view === 'login' && !loading;
    const success = view === 'success' && !loading;

    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <div>
            <h1>Auth Base</h1>
            <h3>A React boilerplate for apps requiring a login</h3>
          </div>
        </header>
        <div className="app-main container">
          <div className="app-instructions">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
          <div className="app-forms">
            <div className="app-links">
              <button onClick={() => this.setState({ view: 'register' })}>Register</button>
              <button onClick={() => this.setState({ view: 'login' })}>Login</button>
              <button onClick={() => this.setState({ view: 'success' })}>Current User</button>
            </div>
            {loading && <Loading />}
            {register && <Register onSuccess={() => this.setState({ view: 'success' })} />}
            {login && <Login onSuccess={() => this.setState({ view: 'success' })} />}
            {success && user && (
              <div className="app-success">
                <div>
                  <h3>
                    {user.get('first_name')} {user.get('last_name')}
                  </h3>
                  {user.get('email')}
                  <small>User ID {user.get('id')}</small>
                  <button className="btn" onClick={this.logout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
            {success && !user && (
              <div className="app-success">
                <h3>Logged Out</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyToken: token => dispatch(verifyToken(token)),
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
