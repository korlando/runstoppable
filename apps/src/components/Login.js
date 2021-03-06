import React, { Component } from 'react';
import crypto from 'crypto';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { loginUser, verifyPass } from '../util';
import lf from '../lf';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    this.emailInput.focus();
  };

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const emailLC = email.toLowerCase();

    lf.getItem('db').then((db) => {
      if(db === null) {
        // this shouldn't happen
        return;
      }
      const user = db.users.find(u => {
        return u.email === emailLC || u.username === emailLC;
      });

      if(!user) {
        return this.setState({
          error: 'No user found with that email/username!'
        });
      }
      
      if(!verifyPass(user.password, password)) {
        return this.setState({ error: 'Incorrect password' });
      }

      lf.setItem('uid', user.id)
      .then(() => {
        loginUser(user);
      }).catch((err) => {

      });
    }).catch((err) => {

    });
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div className="flexbox align-items-center justify-content-center"
        style={{ width: '100vw', height: '100vh' }}>
        <div className="login-box">
          <h1 className="text-center" style={{marginBottom:'30px'}}>Runstoppable</h1>
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
          { error &&
            <div className="text-danger" style={{paddingTop: '10px'}}>{error}</div>
          }
        </div>
      </div>
    );
  };
};

export default withRouter(Login);