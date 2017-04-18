import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaceChart from './Charts/PaceChart';
import HeartRateChart from './Charts/HeartRateChart';
import BigStat from './BigStat';

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
        
        <div style={{ marginBottom: '20px' }}>
          <PaceChart runId={run.id}/>
        </div>

        <div>
          <HeartRateChart runId={run.id}/>
        </div>
      </div>
    );
  };
};