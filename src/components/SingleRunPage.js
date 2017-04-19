import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRunPath } from '../util';

import PaceChart from './Charts/PaceChart';
import HeartRateChart from './Charts/HeartRateChart';
import DistanceChart from './Charts/DistanceChart';
import ElevationChart from './Charts/ElevationChart';

const mapStateToProps = (state, ownProps) => {
  const runId = ownProps.match.params.runId;
  
  return {
    run: state.run.runMap[runId]
  };
};

@connect(mapStateToProps)
export default class SingleRunPage extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    if(this.props.run && this.map) {
      renderRunPath(this.map, this.props.run);
    }
  };

  componentDidUpdate(prevProps) {
    if(prevProps.run !== this.props.run && this.map) {
      renderRunPath(this.map, this.props.run);
    }
  };

  render() {
    const { run, avgPace, avgHeartRate } = this.props;
    if(!run) return null;

    let dateFormat = 'MMM D, h:mm a';
    const thisYear = new Date().getFullYear();
    if(run.start.year() !== thisYear) {
      dateFormat = 'MMM D, YYYY, h:mm a';
    }

    return (
      <div className="page-container">
        <div className="flexbox align-items-baseline">
          <h2 style={{marginRight: '10px'}}>
            {run.location}
          </h2>
          <h3 style={{color: '#747e95'}}>
            {run.start.format(dateFormat)}
          </h3>
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
              <PaceChart runIds={[run.id]}/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="chart-container">
              <HeartRateChart runIds={[run.id]}/>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-sm-6">
            <div className="chart-container">
              <ElevationChart runIds={[run.id]}/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="chart-container">
              <DistanceChart runIds={[run.id]}/>
            </div>
          </div>     
        </div> 

      </div>
    );
  };
};