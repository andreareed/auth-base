import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import Register from './views/Register';
import Login from './views/Login';

class App extends Component {
  state = {
    view: 'Register',
  };
  render() {
    const { view } = this.state;
    const { user } = this.props;
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
            {view === 'register' && (
              <Register onSuccess={() => this.setState({ view: 'success' })} />
            )}
            {view === 'login' && <Login onSuccess={() => this.setState({ view: 'success' })} />}
            {view === 'success' && (
              <div className="app-success">
                <div>
                  <h3>
                    {user.get('first_name')} {user.get('last_name')}
                  </h3>
                  {user.get('email')}
                  <small>User ID {user.get('id')}</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.user.toJS());
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
