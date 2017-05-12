import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../util'
import { Link } from 'react-router-dom';
import CloseButton from '../CloseButton';
import GeneralSettings from '../Settings/General';
import ProfileSettings from '../Settings/Profile';
import AccountSettings from '../Settings/Account';

const mapStateToProps = (state) => {
  return {
    data: state.modal.data
  };
};

@connect(mapStateToProps)
export default class SettingsModal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentTab: (props.data && props.data.currentTab) || 'general'
    };
  };

  render() {
    return (
      <div className="modal-custom"
        onClick={e => e.stopPropagation()}>
        <div className="modal-top"
          style={{borderBottom: '0px'}}>
          <div className="flexbox align-items-center">
            
            <div className="flex1">
              <ul className="nav nav-tabs nav-justified">
                <li className="nav-item">
                  <a className={`nav-link ${this.state.currentTab==='general' ? "active" : ""} `}
                  onClick={e =>{ e.preventDefault(); this.setState( {currentTab: "general"} ) } } 
                  href="#">General</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${this.state.currentTab==='profile' ? "active" : ""} `} 
                  onClick={e =>{ e.preventDefault(); this.setState( {currentTab: "profile"} ) } } 
                  href="#">Profile</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${this.state.currentTab==='account' ? "active" : ""} `} 
                  onClick={e =>{ e.preventDefault(); this.setState( {currentTab: "account"} ) } } 
                  href="#">Account</a>
                </li>
              </ul>
            </div>
            
            <div className="flex-end">
              <button type="button"
                className="text-light"
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  width: '50px',
                  height: '50px'
                }}
                onClick={toggleModal}>
                <i className="material-icons" style={{fontSize: '50px'}}>clear</i>
              </button>
            </div>

          </div>
        </div>
    
      {this.state.currentTab === 'general' && <GeneralSettings/>}
      {this.state.currentTab === 'profile' && <ProfileSettings/>}
      {this.state.currentTab === 'account' && <AccountSettings/>}

      </div>
    );
  };
};