import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleModal } from '../util'

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
          <div className="links">

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