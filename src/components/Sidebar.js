import React, { Component } from 'react';
import { connect } from 'react-redux';

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

        </div>
      </div>
    );
  };
};