import React, { Component } from 'react';
import { connect } from 'react-redux';
import getMostRecentRun from '../selectors/getMostRecentRun';
import PaceChart from './Charts/PaceChart';
import HeartRateChart from './Charts/HeartRateChart';
import DistanceChart from './Charts/DistanceChart';
import ElevationChart from './Charts/ElevationChart';
import DashStats from './DashStats';

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
        <DashStats/>
        { mostRecentRun &&
          <div>
            <h3>Your most recent run</h3>
            
            <div className="row">
              <div className="col">
                <PaceChart runIds={[mostRecentRun.id]}/></div>
              <div className="col">
                <HeartRateChart runIds={[mostRecentRun.id]}/></div>
            </div>

            <div className="row">
              <div className="col">
                <ElevationChart runIds={[mostRecentRun.id]}/></div>
              <div className="col">
                <DistanceChart runIds={[mostRecentRun.id]}/></div>
            </div>
          </div>
        }
      </div>
    );
  };
};