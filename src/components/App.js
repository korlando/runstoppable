import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import Sidebar from './Sidebar';
import ModalWrapper from './Modals/ModalWrapper';
import Dashboard from './Dashboard';
import RunsPage from './RunsPage';
import SingleRunPage from './SingleRunPage';
import CompareRunsPage from './CompareRunsPage';
import ProfilePage from './ProfilePage';

import { dispatchAddBulkRuns,
         closeAllMenus,
         parseRun } from '../util';
import runData from '../data/runData';

const history = createHistory();

const mapStateToProps = (state) => {
  return {
    collapsed: state.sidebar.collapsed,
    menus: state.menu
  };
};

@connect(mapStateToProps)
export default class App extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    // parse the initial run data
    const parsedRunData = {};
    Object.keys(runData).forEach((key) => {
      parsedRunData[key] = parseRun(runData[key]);
    });
    
    dispatchAddBulkRuns(parsedRunData);
  };

  render() {
    const { collapsed, menus } = this.props;

    return (
      <HashRouter history={history}>
        <div className="flexbox"
          onClick={e => {
            if(Object.keys(menus).length) {
              closeAllMenus();
            }
          }}
          style={{
            overflow: 'hidden',
            width: '100vw',
            height: '100vh'
          }}>

          <Sidebar/>
          <ModalWrapper/>

          <div className="flex1">
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/runs"/>
            <Route path="/runs/:runId" component={SingleRunPage}/>
            <Route exact path="/compare"/>
            <Route path="/compare/:runIds" component={CompareRunsPage}/>
            <Route path="/profile" component={ProfilePage}/>

            <RunsPage/>
          </div>
        </div>
      </HashRouter>
    );
  };
};