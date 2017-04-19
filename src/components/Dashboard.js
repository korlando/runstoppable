import React, { Component } from 'react';
import { connect } from 'react-redux';
import getMostRecentRun from '../selectors/getMostRecentRun';
import PaceChart from './Charts/PaceChart';
import HeartRateChart from './Charts/HeartRateChart';
import DistanceChart from './Charts/DistanceChart';
import ElevationChart from './Charts/ElevationChart';

const mapStateToProps = (state) => {
  return {
    mostRecentRun: getMostRecentRun(state)
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
      <div className="page-container">
        <h1 className="text-center">RUNSTOPPABLE</h1>
        { mostRecentRun &&
          <div>
            <div className="row">
              <div className="col">
                <PaceChart runId={mostRecentRun.id}/></div>
              <div className="col">
                <HeartRateChart runId={mostRecentRun.id}/></div>
            </div>

            <div className="row">
              <div className="col">
                <ElevationChart runId={mostRecentRun.id}/></div>
              <div className="col">
                <DistanceChart runId={mostRecentRun.id}/></div>
            </div>
          </div>
        }
      </div>
    );
  };
};