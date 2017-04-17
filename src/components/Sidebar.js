import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleModal } from '../util'

const mapStateToProps = (state) => {
  return {
    collapsed: state.sidebar.collapsed
  };
};

@connect(mapStateToProps)
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { collapsed } = this.props;

    return (
      <div className={`sidebar-wrapper${collapsed ? ' collapsed' : ''}`}>
        <div className="sidebar">
          <div className="links">
            <Link to="/" className="flexbox align-items-center">
              <i className="material-icons md-48">home</i>
              <span className="text">Home</span>
            </Link>
            <Link to="/runs" className="flexbox align-items-center">
              <i className="material-icons md-48">directions_run</i>
              <span className="text">Runs</span>
            </Link>
            <Link to="" onClick={toggleModal} className="flexbox align-items-center">
              <i className="material-icons md-48">compare_arrows</i>
              <span className="text">Compare</span>
            </Link>
          </div>
        </div>
      </div>
    );
  };
};