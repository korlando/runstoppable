import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

import { toggleModal, setModal, toggleSidebar } from '../util'
import CloseButton from './CloseButton';
import modalTypes from '../constants/modalTypes';

const mapStateToProps = (state) => {
  return {
    collapsed: state.sidebar.collapsed,
    name: state.user.name,
    photo: state.user.photo
  };
};

export default withRouter(
@connect(mapStateToProps)
class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
  };

  handleDrop(files) {
    if(!files || !files[0]) {
      return;
    }
    // http://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it
    const fr = new FileReader();
    fr.readAsText(files[0]);
    fr.onload = (e) => {
      const run = JSON.parse(e.target.result);
    };
  };

  render() {
    const { collapsed, location, name, photo } = this.props;
    const { pathname } = location;

    return (
      <div className={`flex0 sidebar-wrapper${collapsed ? ' collapsed' : ''}`}>
        <div className="sidebar">
          <div className="flexbox" style={{ padding: '0 13px' }}>
            <CloseButton
              className="flex0"
              onClick={toggleSidebar}/>
          </div>
          <div className="links">
          
            <Link to="/profile" className="flexbox align-items-center"
              style={{ marginTop: '10px', padding: '7px', height: '50px' }}>
              <img src={photo}
                style={{ borderRadius: '50%' }}
                height="36"
                width="36"></img>
              <span className="text"
                style={{ fontWeight: '700', whiteSpace: 'nowrap' }}>{name}</span>
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
                setModal(modalTypes.compare);
                toggleModal();
              }}
              className="flexbox align-items-center">
              <i className="material-icons md-48">compare_arrows</i>
              <span className="text">Compare</span>
            </Link>

            <Dropzone
              style={{}}
              accept="application/json"
              onDrop={this.handleDrop}>
              <Link to=""
                className="flexbox align-items-center"
                onClick={e => e.preventDefault()}>
                <i className="material-icons md-48">publish</i>
                <span className="text">Upload Run Data</span>
              </Link>
            </Dropzone>

          </div>
        </div>
      </div>
    );
  };
});