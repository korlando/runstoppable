import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { openModal,
         toggleModal,
         verifyPass,
         encryptPassword,
         fetchDB,
         updateDB,
         findUserById,
         editProfile } from '../../util';
import modalTypes from '../../constants/modalTypes';

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+$/i;

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

@connect(mapStateToProps)
export default class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.user.email,
      currentPassword: '',
      newPassword: '',
    };
    this.savePassword = this.savePassword.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
  };

  savePassword(currentPassword, newPassword) {
    if(!currentPassword) {
      return this.setState({
        passError: 'Please fill out your current password'
      });
    }

    const { user } = this.props;
    if(!verifyPass(user.password, currentPassword)) {
      return this.setState({ passError: 'Incorrect password' });
    }
    if(newPassword.length < 6) {
      return this.setState({
        passError: 'Please choose a new password at least 6 characters long'
      });
    }

    const encrypted = encryptPassword(newPassword);
    fetchDB().then((db) => {
      if(db) {
        const userDoc = findUserById(db, user.id);
        if(userDoc) {
          userDoc.password = encrypted;
          updateDB(db).then(() => {
            editProfile({ password: newPassword });
            this.setState({
              passError: '',
              passSuccess: 'Password updated successfully',
            });

            setTimeout(() => {
              this.setState({ passSuccess: '' });
            }, 5 * 1000);
          }).catch((err) => {

          });
        }
      }
    }).catch((err) => {

    });
  };

  saveEmail(email) {
    email = email.trim().toLowerCase();
    if(!email.match(EMAIL_REGEX)) {
      return this.setState({ emailError: 'Please type a valid email address' });
    }

    fetchDB().then((db) => {
      if(db) {
        const { user } = this.props;
        const userDoc = findUserById(db, user.id);
        if(userDoc) {
          userDoc.email = email;
          updateDB(db).then(() => {
            editProfile({ email });
            this.setState({
              emailError: '',
              emailSuccess: 'Email updated successfully',
            });

            setTimeout(() => {
              this.setState({ emailSuccess: '' });
            }, 5 * 1000);
          }).catch((err) => {

          });
        }
      }
    }).catch((err) => {

    });
  };

  render() {
    const { user } = this.props;
    const { email,
            currentPassword,
            newPassword,
            emailError,
            emailSuccess,
            passError,
            passSuccess } = this.state;

    return (
      <div style={{padding: '0 0 0 20px'}}>

        <div style={{ marginBottom: '50px' }}>
          <div className="flexbox">
            <div>
              <div className="form-group">
                <label htmlFor="usr">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="usr"
                  value={email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}/>
              </div>
            </div>

            <div className="flexbox align-items-end" style={{padding: '0 0 16px 50px'}}>
              <button
                className="btn btn-success"
                disabled={user.email === email}
                onClick={() => {
                  this.saveEmail(email);
                }}>
                Change Email
              </button>
            </div>
          </div>
          <div className="text-danger">{emailError}</div>
          <div className="text-success">{emailSuccess}</div>
        </div>

        <div className="flexbox">
          <div className="form-group" >
            <label htmlFor="current-pwd">Current Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Current Password"
              id="current-pwd"
              value={currentPassword}
              onChange={e => {
                this.setState({ currentPassword: e.target.value });
              }}/>
          </div>
        </div>
            
        <div className="flexbox">
          <div>
            <div className="form-group">
              <label htmlFor="new-pwd">New Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                id="new-pwd"
                value={newPassword}
                onChange={e => {
                  this.setState({ newPassword: e.target.value });
                }}/>
            </div>
            <div className="flexbox">    
              <div style={{position: 'relative', width: '100%', margin: '5px 0px 1rem'}}>
                <div style={{height: '4px', backgroundColor: 'rgb(232, 232, 232)', width: '100%', position: 'absolute', left: '0px'}}>
                </div>
                <div id="password-strength-meter" style={{height: '4px', width: '0%', position: 'absolute', left: '0px'}}>
                </div>
                <div style={{height: '4px', width: '2px', backgroundColor: 'rgb(255, 255, 255)', position: 'absolute', left: '25%'}}>
                </div>
                <div style={{height: '4px', width: '2px', backgroundColor: 'rgb(255, 255, 255)', position: 'absolute', left: '50%'}}>
                </div>
                <div style={{height: '4px', width: '2px', backgroundColor: 'rgb(255, 255, 255)', position: 'absolute', left: '75%'}}>
                </div>
                <div id="password-strength-label" style={{float: 'right', marginTop: '6px', lineHeight: '16px', fontSize: '11px', color: 'rgb(68, 68, 68)'}}>
                Very weak</div>
              </div>
            </div> 
          </div>
             
          <div className="flexbox align-items-end"
            style={{padding: '0 0 60px 50px'}}>
            <button
              className="btn btn-success"
              disabled={false}
              onClick={() => {
                this.savePassword(currentPassword, newPassword);
              }}>Change Password</button>
          </div>
        </div>
        <div className="text-danger">{passError}</div>
        <div className="text-success">{passSuccess}</div>

        <div className="flexbox align-items-center"
          style={{ paddingTop: '40px' }}>
          <button className="btn btn-danger"
            onClick={() => {
              openModal(modalTypes.deleteAccount);
            }}>Delete Account</button>
        </div>
        
      </div>
    );
  };
};