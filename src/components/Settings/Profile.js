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
          
          <div className="flexbox align-items-center">
            
            <div className="flex0" style={{padding: '20px 50px 20px 20px'}}>
              <img src="https://avatars.slack-edge.com/2017-03-24/158411923920_7614b17cc53af6223f1b_72.jpg" style={{width:"200", borderRadius: "50%", marginBottom: "20px"}}></img>
              <h2 style={{marginBottom: '0px', padding: '0 0 20px 0'}}>Ron Stoppable</h2>
              <button className="btn btn-default" onClick={console.log("mile")}>Edit Profile</button>
            </div>

            <div className="flex1">
              <div className="flex0">
                <h3 style={{color: "rgb(116, 126, 149)"}}>Birthday</h3>
                <h2 style={{marginRight: '10px'}}>09/17/1994</h2>
              </div>

              <div className="flex0">
                <h3 style={{color: "rgb(116, 126, 149)"}}>Height</h3>
                <h2 style={{marginRight: '10px'}}>5ft 6in</h2>
              </div>

              <div className="flex0">
                <h3 style={{color: "rgb(116, 126, 149)"}}>Weight</h3>
                <h2 style={{marginRight: '10px'}}>140lb</h2>
              </div>
            </div>            

          </div>

          <div className="flexbox footer">
            <h2>Shoes</h2>
            <button className="btn btn-default">Add Shoe</button>
          </div>

        </div>
      );
    };
  }
) 