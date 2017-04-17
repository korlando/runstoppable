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
            <Link to="/"><i className="material-icons md-48">home</i>Home</Link>
            <Link to="/runs"><i className="material-icons md-48">directions_run</i>Runs</Link>
            <Link to="" onClick={toggleModal}><i className="material-icons md-48">compare_arrows</i>Compare</Link>
          </div>
        </div>
      </div>
    );
  };
};