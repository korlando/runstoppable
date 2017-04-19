import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PaceChart from './Charts/PaceChart';
import HeartRateChart from './Charts/HeartRateChart';
import DistanceChart from './Charts/DistanceChart';
import ElevationChart from './Charts/ElevationChart';

const mapStateToProps = (state, ownProps) => {
  return {
    runMap: state.run.runMap,
    activeRunIds: ownProps.match.params.runIds.split(',')
  };
};

export default withRouter(
@connect(mapStateToProps)
class CompareRunsPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { runMap, activeRunIds } = this.props;
    return (
      <div className="page-container">
        <div className="active-run-tags">
          { activeRunIds.map((id) => {
            
          })}
        </div>


      </div>
    );
  };
});