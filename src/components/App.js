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
import TrendsPage from './TrendsPage';
import Login from './Login';

import { dispatchAddBulkRuns,
         closeAllMenus,
         parseRun,
         editProfile } from '../util';
import lf from '../lf';
import runData from '../data/runData';

const history = createHistory();

const mapStateToProps = (state) => {
  return {
    collapsed: state.sidebar.collapsed,
    menus: state.menu,
    loggedIn: state.user.loggedIn
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

    lf.getItem('user').then((user) => {
      if(user === null) {
        editProfile({ loggedIn: false });
      } else if(user) {
        editProfile(Object.assign({ loggedIn: true }, user));
      }
    }).catch((err) => {

    });
  };

  render() {
    const { collapsed, menus, loggedIn } = this.props;

    return (
      <HashRouter history={history}>
        <div>
          { loggedIn === true &&
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
                <Route path="/trends" component={TrendsPage}/>

                <RunsPage/>
              </div>
            </div>
          }
          { loggedIn === false &&
            <Login/>
          }
        </div>
      </HashRouter>
    );
  };
};