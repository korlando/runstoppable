import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidebar } from '../util';
import Sidebar from './Sidebar';

const mapStateToProps = (state) => {
  return {
    collapsed: state.sidebar.collapsed
  };
};

@connect(mapStateToProps)
export default class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { collapsed } = this.props;

    return (
      <div className="flexbox">
        <button className={`menu-icon${!collapsed ? ' transform-x' : ''}`}
          onClick={toggleSidebar}>
          <svg className="line">
            <line x1="2" x2="18" y1="2" y2="2"/>
          </svg>
          <svg className="line">
            <line x1="2" x2="18" y1="2" y2="2"/>
          </svg>
          <svg className="line">
            <line x1="2" x2="18" y1="2" y2="2"/>
          </svg>
        </button>

        <Sidebar/>

        <div className="flex1">
          {this.props.children}
        </div>
      </div>
    );
  };
};