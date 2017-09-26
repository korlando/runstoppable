import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

    this.state = {
      lastRemovedRun: null,
      lastCompareURL: ''
    };
    this.resetLastRemove = this.resetLastRemove.bind(this);
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

  resetLastRemove() {
    this.setState({
      lastRemovedRun: null,
      lastCompareURL: ''
    });
  };

  render() {
    const { runMap,
            activeRunIds,
            history,
            location } = this.props;
    const { lastRemovedRun, lastCompareURL } = this.state;

    return (
      <div className="page-container relative">
        <ReactCSSTransitionGroup
          transitionName="alert-box"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
        { lastRemovedRun && lastCompareURL &&
          <div key="1" className="alert-box flexbox align-items-center">
            <div className="fw300" style={{marginRight: '15px'}}>
              Removed {lastRemovedRun.name}
            </div>
            <div className="clickable"
              style={{marginRight: '15px'}}
              onClick={() => {
                clearTimeout(this.timer);
                this.resetLastRemove();
                history.push(lastCompareURL);
              }}>UNDO</div>
            <CloseButton
              className="transform-x"
              onClick={() => {
                clearTimeout(this.timer);
                this.resetLastRemove();
              }}/>
          </div>
        }
        </ReactCSSTransitionGroup>
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
                    const currentLoc = location.pathname;
                    const newIds = activeRunIds.filter(id => id !== runId).join(',');
                    if(newIds === '') {
                      return history.push('/runs');
                    }
                    this.setState({
                      lastRemovedRun: run,
                      lastCompareURL: currentLoc
                    });
                    history.push(`/compare/${newIds}`);

                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                      this.resetLastRemove();
                    }, 10 * 1000);
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