import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import { Link } from 'react-router-dom';


export default withRouter(
  class AccountSettings extends Component {
      constructor(props) {
        super(props);
      };


    render() {

      return (
        <div>
          <div className="flexbox align-items-center" style={{padding: '0 0 50px 0'}}>
            <div className="flex0">
              <div className="form-group">
                <label for="usr">Name:</label>
                <input type="text" className="form-control" id="usr"></input>
              </div>
                <div className="form-group">
                  <label for="pwd">Password:</label>
                  <input type="password" className="form-control" id="pwd"></input>
              </div>
            </div>
          </div>

          <button className="btn btn-default" onClick={console.log(" ")}>Delete Account</button>
          
        </div>
      );
    };
  }
) 