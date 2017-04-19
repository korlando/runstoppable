import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renderRunPath } from '../util';

import PaceChart from './Charts/PaceChart';
import HeartRateChart from './Charts/HeartRateChart';
import DistanceChart from './Charts/DistanceChart';
import ElevationChart from './Charts/ElevationChart';

const mapStateToProps = (state, ownProps) => {
  const { runMap } = state.run;
  const activeRunIds = ownProps.match.params.runIds.split(',');
  const activeRuns = activeRunIds.reduce((arr, id) => [...arr, runMap[id]], []);
  
  return {
    runMap,
    activeRunIds,
    activeRuns
  };
};

export default withRouter(
@connect(mapStateToProps)
class CompareRunsPage extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    if(this.map) {
      renderRunPath(this.map, this.props.activeRuns, true, true);
    }
  };

  componentDidUpdate(prevProps) {
    if(prevProps.activeRuns !== this.props.activeRuns) {
      renderRunPath(this.map, this.props.activeRuns, true, true);
    }
  };

  render() {
    const { runMap, activeRunIds } = this.props;
    return (
      <div className="page-container">
        <div className="active-run-tags">
          { activeRunIds.map((id) => {
            
          })}
        </div>

        <div className="row">
          <div className="col-12">
            <div ref={node => this.map = node}
              style={{
                width: '100%',
                height: '200px'
              }}></div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="chart-container">
              <PaceChart runIds={activeRunIds}/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="chart-container">
              <HeartRateChart runIds={activeRunIds}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="chart-container">
              <ElevationChart runIds={activeRunIds}/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="chart-container">
              <DistanceChart runIds={activeRunIds}/>
            </div>
          </div>
        </div>
      </div>
    );
  };
});