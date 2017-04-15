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
            <Link to="/">Home</Link>
            <Link to="/runs">Runs</Link>
            <Link to="" onClick={toggleModal}>Compare</Link>
          </div>
        </div>
      </div>
    );
  };
};