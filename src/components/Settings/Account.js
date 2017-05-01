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
            <div className="flex0" style={{padding: '0 50px 0 20px'}}>
              <h3 style={{marginBottom: '0px'}}>Graph units:</h3>
            </div>

            <div className="flex0">
              <button className="btn btn-default" onClick={console.log("mile")}>mile</button>
              <button className="btn btn-primary" onClick={console.log("km")}>km</button>
            </div>
          </div>

          <div className="flexbox align-items-center">
            <div className="flex0" style={{padding: '0 50px 0 20px'}}>
              <h3 style={{marginBottom: '0px'}}>Time zone:</h3>
            </div>

            <div className="flex0">
              <button className="btn btn-primary" onClick={console.log("time")}>EST (UTC -5:00)</button>
            </div>
          </div>
        </div>
      );
    };
  }
) 