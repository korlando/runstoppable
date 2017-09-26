import React, { Component } from 'react';
import { connect } from 'react-redux';

import getMostRecentRun from '../selectors/getMostRecentRun';
import SingleRunPage from './SingleRunPage';
import PaceChart from './Charts/PaceChart';
import HeartRateChart from './Charts/HeartRateChart';
import DistanceChart from './Charts/DistanceChart';
import ElevationChart from './Charts/ElevationChart';
import DashStats from './DashStats';

const mapStateToProps = (state) => {
  return {
    mostRecentRun: getMostRecentRun(state),
  };
};

@connect(mapStateToProps)
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { mostRecentRun } = this.props;
    
    return (
      <div className="container-fluid page-container">
        <DashStats/>
        { mostRecentRun &&
          <div>
            <h3>Your most recent run</h3>
            <SingleRunPage runId={mostRecentRun.id} noContainer={true}/>
          </div>
        }
      </div>
    );
  };
};