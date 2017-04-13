import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebar } from '../util';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import RunsPage from './RunsPage';

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
      <HashRouter>
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
            <Route exact path="/" component={Dashboard}/>
            <Route path="/runs" component={RunsPage}/>
          </div>
        </div>
      </HashRouter>
    );
  };
};