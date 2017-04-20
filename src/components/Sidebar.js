import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleModal, toggleSidebar } from '../util'
import CloseButton from './CloseButton';

const mapStateToProps = (state) => {
  return {
    collapsed: state.sidebar.collapsed
  };
};

export default withRouter(
@connect(mapStateToProps)
class Sidebar extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { collapsed, location } = this.props;
    const { pathname } = location;

    return (
      <div className={`flex0 sidebar-wrapper${collapsed ? ' collapsed' : ''}`}>
        <div className="sidebar">
          <div className="flexbox" style={{ padding: '0 12px' }}>
            <CloseButton
              className={`flex0 ${!collapsed ? 'transform-x' : ''}`}
              onClick={toggleSidebar}/>
          </div>
          <div className="links">
          
            <Link to="/" className={`flexbox align-items-center}`}
              style={{ marginTop: '10px', paddingLeft: '10px' }}>
              <img src="https://avatars.slack-edge.com/2017-03-24/158411923920_7614b17cc53af6223f1b_72.jpg"
              style={{ borderRadius: '50%' }} height="36" width="36"></img>
              <span className="text"
                style={{ fontWeight: '700', whiteSpace: 'nowrap' }}>Ron Stoppable</span>
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
                toggleModal();
              }}
              className="flexbox align-items-center">
              <i className="material-icons md-48">compare_arrows</i>
              <span className="text">Compare</span>
            </Link>

          </div>
        </div>
      </div>
    );
  };
});