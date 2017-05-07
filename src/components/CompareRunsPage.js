import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renderRunPath } from '../util';
import runColors from '../constants/runColors';

import PaceChart from './Charts/PaceChart';
import HeartRateChart from './Charts/HeartRateChart';
import DistanceChart from './Charts/DistanceChart';
import ElevationChart from './Charts/ElevationChart';
import CloseButton from './CloseButton';

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

class CompareRunsPage extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    if(this.map) {
      renderRunPath(
        this.map,
        this.props.activeRuns,
        true, true, true,
        this.resetButton
      );
    }
  };

  componentDidUpdate(prevProps) {
    if(prevProps.activeRuns !== this.props.activeRuns) {
      renderRunPath(
        this.map,
        this.props.activeRuns,
        true, true, true,
        this.resetButton
      );
    }
  };

  render() {
    const { runMap, activeRunIds, history } = this.props;

    return (
      <div className="page-container">
        <h1>Compare Runs</h1>
        <div className="active-run-tags mb16">
          { activeRunIds.map((runId, i) => {
            const run = runMap[runId];
            if(!run) return null;
            
            return (
              <div key={runId}
                className="run-tag flexbox align-items-center"
                style={{ backgroundColor: runColors[i % runColors.length] }}>
                <span className="mr5">{ run.location },</span>
                <span className="mr5">
                  {run.start.format('MM/D/YY, h:mm a')}
                </span>
                <CloseButton
                  className="transform-x"
                  onClick={() => {
                    const newIds = activeRunIds.filter(id => id !== runId).join(',');
                    if(newIds === '') {
                      return history.push('/runs');
                    }
                    history.push(`/compare/${newIds}`);
                  }}/>
              </div>
            );
          })}
        </div>

        <div className="row mb16">
          <div className="col-12">
            <button
              ref={node => this.resetButton = node}
              className="btn btn-default map-reset">
              Reset View
            </button>
            <div className="rs-border br3"
              style={{ height: '250px' }}
              ref={node => this.map = node}></div>
          </div>
        </div>

        <div className="row mb16">
          <div className="col-sm-6 pr8">
            <div className="chart-container">
              <PaceChart runIds={activeRunIds}/>
            </div>
          </div>
          <div className="col-sm-6 pl8">
            <div className="chart-container">
              <HeartRateChart runIds={activeRunIds}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 pr8">
            <div className="chart-container">
              <ElevationChart runIds={activeRunIds}/>
            </div>
          </div>
          <div className="col-sm-6 pl8">
            <div className="chart-container">
              <DistanceChart runIds={activeRunIds}/>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(connect(mapStateToProps)(CompareRunsPage));