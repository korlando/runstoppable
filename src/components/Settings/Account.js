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

          <div className="flexbox" style={{padding: '0 0 50px 20px'}}>
              <div>
                <div className="form-group">
                  <label for="usr">Email:</label>
                  <input type="text" className="form-control" id="usr"></input>
                </div>
              </div>

              <div className="flexbox align-items-end" style={{padding: '0 0 16px 50px'}}>
                <button className="btn btn-success"disabled={false}>Change Email</button>
              </div>
          </div>

          <div className="flexbox" style={{padding: '0 0 0 20px'}}>
            <div className="form-group" >
              <label for="current-pwd">Current Password:</label>
              <input type="password" className="form-control" id="current-pwd"></input>
            </div>
          </div>
              
          <div className="flexbox" style={{padding: '0 0 50px 20px'}}>
            <div>
              <div className="form-group">
                <label for="new-pwd">New Password:</label>
                <input type="password" className="form-control" id="new-pwd"></input>
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
               
            <div className="flexbox align-items-end" style={{padding: '0 0 60px 50px'}}>
              <button className="btn btn-success"disabled={false}>Change Password</button>
            </div>
          </div>

          <div className="flexbox align-items-center" style={{padding: '0 0 0 20px'}}>
            <button className="btn btn-default" onClick={console.log(" ")}>Delete Account</button>
          </div>
          
        </div>
      );
    };
  }
) 