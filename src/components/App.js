import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatchAddBulkRuns,
         closeAllMenus } from '../util';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment';
import Sidebar from './Sidebar';
import ModalWrapper from './Modal/ModalWrapper';
import Dashboard from './Dashboard';
import RunsPage from './RunsPage';
import SingleRunPage from './SingleRunPage';
import CompareRunsPage from './CompareRunsPage';
import runData from '../data/runData';

const history = createHistory();
const JSON_DATE_REGEX = /^\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2}$/;

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
      const run = runData[key];
      // TODO: update dummy location for GR5
      const parsedRun = {
        location: 'Cambridge, MA',
        checkpoints: []
      };

      // parse the run start date
      if(run.date && run.date.match(JSON_DATE_REGEX)) {
        parsedRun.start = moment(run.date, 'YYYY_MM_DD_HH_mm_ss');
      }
      
      const plsSmooth = ["pace", "heartRate", "elevation"];
      const sVal = {
        "pace": {
          "prevValue": null,
          "threshold": 4,
          "unreal": 0,
        },
        "heartRate": {
          "prevValue": null,
          "threshold": 5,
          "unreal": 5,
        },
        "elevation": {
          "prevValue": null,
          "threshold": 4,
          "unreal": -100000,
        }
      }

      run.checkpoints.forEach((checkpoint, i) => {
        // skip over units object
        if(i%2 !== 0) {
          const parsedCheckpoint = {};
          Object.keys(checkpoint).forEach((cKey) => {
            var keyValue = Number.parseFloat(checkpoint[cKey]);
            if (plsSmooth.includes(cKey)) {
                if (sVal[cKey].prevValue == null) {
                    sVal[cKey].prevValue = keyValue;
                }
                const delta = Math.abs(keyValue - sVal[cKey].prevValue);
                if (keyValue < sVal[cKey].unreal || delta > sVal[cKey].threshold) {
                    parsedCheckpoint[cKey] = null;
                }
                else {
                    sVal[cKey].prevValue = keyValue;
                    parsedCheckpoint[cKey] = keyValue;
                }
            } else {
              parsedCheckpoint[cKey] = keyValue;
            }
          });
          parsedRun.checkpoints.push(parsedCheckpoint);
        }
      });

      parsedRunData[key] = parsedRun;
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

            <RunsPage/>
          </div>
        </div>
      </HashRouter>
    );
  };
};