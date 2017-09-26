import React, { Component } from 'react';
import { connect } from 'react-redux';

import { verifyPass,
         fetchDB,
         updateDB,
         logoutUser,
         toggleModal } from '../../util';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

@connect(mapStateToProps)
export default class DeleteAccountModal extends Component {
  constructor(props) {
    super(props);

    this.state = { password: '' };
    this.deleteAccount = this.deleteAccount.bind(this);
  };

  componentDidMount() {
    this.input.focus();
  };

  deleteAccount(password) {
    if(!password) {
      return this.setState({ error: 'Please fill out your password' });
    }
    const { user } = this.props;
    if(!verifyPass(user.password, password)) {
      return this.setState({ error: 'Incorrect password' });
    }

    fetchDB().then((db) => {
      if(db) {
        db.users = db.users.filter(u => u.id !== user.id);
        updateDB(db).then(() => {
          logoutUser();
        }).catch((err) => {

        });
      }
    }).catch((err) => {

    });
  };

  render() {
    const { password, error } = this.state;
    return (
      <div className="modal-custom flexbox flex-column"
        onClick={e => e.stopPropagation()}>
        <div className="flex1">
          <h3>Are you sure you want to delete your account?</h3>
          <p>You will be missed!</p>
          <strong className="mb16">Please enter your password to confirm.</strong>
          <input type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
            ref={node => this.input = node}/>
          <div className="text-danger">{error}</div>
        </div>
        <div className="flex0 flexbox">
          <button type="button"
            className="flex1 btn btn-danger mr5"
            onClick={() => this.deleteAccount(password)}>
            Delete Account
          </button>
          <button type="button"
            className="flex1 btn btn-secondary ml5"
            onClick={() => toggleModal()}>
            Cancel
          </button>
        </div>
      </div>
    );
  };
};