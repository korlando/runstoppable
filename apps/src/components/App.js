import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import ModalWrapper from './Modals/ModalWrapper';
import Dashboard from './Dashboard';
import RunsPage from './RunsPage';
import StarredRunsPage from './StarredRunsPage';
import SingleRunPage from './SingleRunPage';
import CompareRunsPage from './CompareRunsPage';
import ProfilePage from './ProfilePage';
import TrendsPage from './TrendsPage';
import Login from './Login';

import {
  closeAllMenus,
  parseRun,
  editProfile,
  makeFakeDatabase,
  loginUser,
} from '../util';
import lf from '../lf';
import runData from '../data/runData';

const mapStateToProps = (state) => ({
  collapsed: state.sidebar.collapsed,
  menus: state.menu,
  loggedIn: state.user.loggedIn,
});

@connect(mapStateToProps)
export default class App extends Component {
  componentDidMount() {
    const fakeLogin = (db) => {
      // TEMPORARY: load first user in db
      // remove this for production
      const user = db.users[0];
      loginUser(user);
    };
    lf.getItem('db').then((db) => {
      if(!db) {
        // bootstrap the database into local storage
        const fakeDatabase = makeFakeDatabase();
        lf.setItem('db', fakeDatabase).then(() => {
          // TEMP
          return fakeLogin(db);
          editProfile({ loggedIn: false });
        }).catch((err) => {
          // TODO: handle db set error
        });
      } else {
        // TEMP
        return fakeLogin(db);
        // check if logged in
        lf.getItem('uid').then((uid) => {
          if(uid === null || !uid) {
            return editProfile({ loggedIn: false });
          }

          // find the user document
          const user = db.users.find(u => u.id === uid);
          if(!user) {
            return editProfile({ loggedIn: false });
          }
          loginUser(user);
        }).catch((err) => {
          // TODO: handle uid lookup error
          
        });
      }
    }).catch((err) => {
      // TODO: handle db lookup error
      
    });
  };

  render() {
    const { collapsed, menus, loggedIn } = this.props;

    return (
      <BrowserRouter>
        <div>
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
              <Route path="/starred" component={StarredRunsPage}/>
              <Route path="/runs/:runId" component={SingleRunPage}/>
              <Route exact path="/compare"/>
              <Route path="/compare/:runIds" component={CompareRunsPage}/>
              <Route path="/profile" component={ProfilePage}/>
              <Route path="/trends" component={TrendsPage}/>

              <RunsPage/>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  };
};