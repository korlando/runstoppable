import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

@connect(mapStateToProps)
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { user } = this.props;

    return (
      <div className="page-container">
        <h1>Profile</h1>
        <div className="text-center">
          <img src={user.photo}
            width="200"
            style={{
              borderRadius: '50%',
              marginBottom: '20px'
            }}/>
          <h2>{user.name}</h2>
          {/* TODO: hook up button with settings modal*/}
          <button type="button"
            className="btn btn-primary btn-sm">Edit</button>
        </div>
      </div>
    );
  };
};