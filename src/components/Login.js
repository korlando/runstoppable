import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { editProfile } from '../util';
import lf from '../lf';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    this.emailInput.focus();
  };

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    lf.setItem('user', { loggedIn: true })
    .then((val) => {
      editProfile(val);
    }).catch((err) => {

    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="flexbox align-items-center justify-content-center"
        style={{ width: '100vw', height: '100vh' }}>
        <div className="login-box">
          <h1 className="text-center">Runstoppable Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="material-icons">person</i>
              </span>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Email or username"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                ref={node => this.emailInput = node}/>
            </div>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="material-icons">lock</i>
              </span>
              <input
                type="password"
                required
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}/>
            </div>
            <button type="submit"
              className="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
};

export default withRouter(Login);