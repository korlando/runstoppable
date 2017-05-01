import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import { Link } from 'react-router-dom';


export default withRouter(
  class ProfileSettings extends Component {
      constructor(props) {
        super(props);
      };


    render() {

      return (
        <div>
          
          <div className="flexbox align-items-center" style={{padding: '0 0 50px 0'}}>
            
            <div className="flex0">
              <img src="https://avatars.slack-edge.com/2017-03-24/158411923920_7614b17cc53af6223f1b_72.jpg" style={{width:"200", borderRadius: "50%", marginBottom: "20px"}}></img>
            </div>

            <div className="flex0">
              <div className="flex0" style={{padding: '0 50px 0 20px'}}>
                <h2 style={{marginBottom: '0px'}}>Ron Stoppable</h2>
              </div>

              <div className="flex0">
                <button className="btn btn-default" onClick={console.log("mile")}>Edit Profile</button>
              </div>
            </div>
          </div>

          
        </div>
      );
    };
  }
) 