import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import localstorage from 'store2';
import logo from './logo.svg';
import Register from './views/Register';
import Login from './views/Login';
import Loading from './common/components/Loading';

import { verifyToken, logout } from './redux/actions';

class App extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    loading: PropTypes.bool.isRequired,
    verifyToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

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

  renderView = () => {
    const { view } = this.state;
    const { user, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (view === 'register') {
      return <Register onSuccess={() => this.setState({ view: 'success' })} />;
    }

    if (view === 'success') {
      if (!user) {
        return (
          <div className="app-success">
            <h3>Logged Out</h3>
          </div>
        );
      }
      return (
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
      );
    }

    return <Login onSuccess={() => this.setState({ view: 'success' })} />;
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <div>
            <h1>Auth Base</h1>
            <h3>A React boilerplate for Registration and Login</h3>
          </div>
        </header>
        <div className="app-main container">
          <div className="app-instructions">
            <p>
              Welcome to Auth Base! To get started, use <code>.env.sample</code> to create your{' '}
              <code>.env</code> file with your database credentials and JSON web token secret. Then,
              run <code>knex migrate:latest</code> to create your users table.
            </p>

            <p>
              Once your table is created, you can test it out here. Registering for a new account
              will automatically log you in and display your user information. You will then have
              the option to logout if you'd like to try out the login form too!
            </p>
            <p>
              For more information, check out the{' '}
              <a
                href="https://github.com/andreareed/auth-base/blob/master/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                README
              </a>
            </p>
          </div>
          <div className="app-forms">
            <div className="app-links">
              <button onClick={() => this.setState({ view: 'register' })}>Register</button>
              <button onClick={() => this.setState({ view: 'login' })}>Login</button>
              <button onClick={() => this.setState({ view: 'success' })}>Current User</button>
            </div>
            {this.renderView()}
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
