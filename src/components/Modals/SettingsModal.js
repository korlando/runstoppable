import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import { Link } from 'react-router-dom';
import CloseButton from '../CloseButton';

export default withRouter(
  class SettingsModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentTab: 'general'
      };
    };

    render() {
      const {  } = this.props;
      const {  } = this.state;

      return (
        <div className="modal-custom" onClick={e => e.stopPropagation()}>
            <div className="flexbox align-items-center">
              
              <ul className="nav nav-tabs">
                <li role="presentation" className="active"><a href="#">General</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Account</a></li>
              </ul>
              
              <div className="flex0" style={{paddingRight: '12px'}}>
                <button type="button"
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#747e95',
                    width: '50px',
                    height: '50px'
                  }}
                  onClick={toggleModal}>
                  <i className="material-icons" style={{fontSize: '50px'}}>clear</i>
                </button>
              </div>
            </div>
        </div>
      );
    };
  }
);