import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebar,
         dispatchAddBulkRuns } from '../util';
import moment from 'moment';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import RunsPage from './RunsPage';
import runData from '../data/runData';

const JSON_DATE_REGEX = /^\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2}$/;

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

  componentDidMount() {
    // parse the initial run data
    const parsedRunData = {};
    Object.keys(runData).forEach((key) => {
      const run = runData[key];
      const parsedRun = {
        checkpoints: []
      };

      // parse the run start date
      if(run.date && run.date.match(JSON_DATE_REGEX)) {
        parsedRun.start = moment(run.date, 'YYYY_MM_DD_HH_mm_ss');
      }
      
      run.checkpoints.forEach((checkpoint, i) => {
        // skip over units object
        if(i !== 0) {
          const parsedCheckpoint = {};
          Object.keys(checkpoint).forEach((cKey) => {
            parsedCheckpoint[cKey] = Number.parseFloat(checkpoint[cKey]);
          });
          parsedRun.checkpoints.push(parsedCheckpoint);
        }
      });

      parsedRunData[key] = parsedRun;
    });
    
    dispatchAddBulkRuns(parsedRunData);
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