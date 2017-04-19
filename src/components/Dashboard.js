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
            <PaceChart runIds={[0,1,mostRecentRun.id]}/>
            <HeartRateChart runIds={[0,1,mostRecentRun.id]}/>
            <DistanceChart runIds={[0,1,mostRecentRun.id]}/>
            <ElevationChart runIds={[0,1,mostRecentRun.id]}/>
          </div>
        }
      </div>
    );
  };
};