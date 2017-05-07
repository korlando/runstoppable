import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { toggleModal,
         setModal,
         toggleSidebar } from '../util'
import CloseButton from './CloseButton';
import modalTypes from '../constants/modalTypes';

const mapStateToProps = (state) => {
  return {
    collapsed: state.sidebar.collapsed,
    name: state.user.name,
    photo: state.user.photo,
  };
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { collapsed, location, name, photo } = this.props;
    const { pathname } = location;

    return (
      <div className={`flex0 sidebar-wrapper
        ${collapsed ? ' collapsed' : ''}`}>
        <div className="sidebar">
          <div className="flexbox align-items-center"
            style={{ padding: '0 13px' }}>
            <CloseButton
              className="flex0"
              onClick={toggleSidebar}/>
            <label className="app-name">Runstoppable</label>
          </div>
          <div className="links">
          
            <Link to=""
              onClick={e => {
                e.preventDefault();
                toggleModal(modalTypes.settings);
              }}
              className="flexbox align-items-center"
              style={{ marginTop: '10px', padding: '7px', height: '50px' }}>
              <img src={photo}
                style={{ borderRadius: '50%' }}
                height="36"
                width="36"></img>
              <span className="text"
                style={{ whiteSpace: 'nowrap', marginLeft: '8px' }}>{name}</span>
            </Link>

            <Link to="/" className={`flexbox align-items-center
              ${pathname === '/' ? ' active' : ''}`}>
              <i className="material-icons md-48">home</i>
              <span className="text">Home</span>
            </Link>

            <Link to="/runs" className={`flexbox align-items-center
              ${pathname === '/runs' ? ' active' : ''}`}>
              <i className="material-icons md-48">directions_run</i>
              <span className="text">Runs</span>
            </Link>


            <Link to=""
              onClick={e => {
                e.preventDefault();
                toggleModal(modalTypes.compare);
              }}
              className="flexbox align-items-center">
              <i className="material-icons md-48">compare_arrows</i>
              <span className="text">Compare</span>
            </Link>

            <Link to=""
              className="flexbox align-items-center"
              onClick={e => {
                e.preventDefault();
                toggleModal(modalTypes.upload);
              }}>
              <i className="material-icons md-48">file_upload</i>
              <span className="text">Upload Run Data</span>
            </Link>

            <Link to="/trends" className={`flexbox align-items-center
              ${pathname === '/trends' ? ' active' : ''}`}>
              <i className="material-icons md-48">show_chart</i>
              <span className="text">Trends</span>
            </Link>

            <Link to=""
              onClick={e => {
                e.preventDefault();
                toggleModal(modalTypes.settings);
              }}
              className="flexbox align-items-center">
              <i className="material-icons md-48">settings</i>
              <span className="text">Settings</span>
            </Link>

          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(connect(mapStateToProps)(Sidebar));