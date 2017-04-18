import React, { Component } from 'react';
import { connect } from 'react-redux';

import getXYRunData from '../../selectors/getXYRunData';
import getAvgRunData from '../../selectors/getAvgRunData';

import DataChart from './DataChart';
import BigStat from '../BigStat';

const color = '#D32F2F';
const layout = {
  xaxis: {
    title: 'Seconds after Start'
  },
  yaxis: {
    title: 'Heart Rate (beats/min)',
    fixedrange: true
  },
  margin: {
    t: 36
  }
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'heartRate'
  });
  return {
    data: getXYRunData(state, props),
    avgHeartRate: getAvgRunData(state, {
      key: 'heartRate',
      runId: props.runId
    })
  };
};

@connect(mapStateToProps)
export default class HeartRateChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { avgHeartRate } = this.props;
    
    return (
      <div>
        <div className="flexbox align-items-baseline">
          <h4 className="flex1 flexbox align-items-center"
            style={{ margin: '0', color }}>
            <i className="material-icons">favorite</i>
            <span style={{ marginLeft: '6px'}}>Heart Rate</span>
          </h4>
          <div className="text-light"
            style={{ marginRight: '6px' }}>Average</div>
          <BigStat stat={avgHeartRate} units="beats/min"/>
        </div>
        <DataChart
          data={this.props.data}
          layout={layout}
          color={color}/>
      </div>
    );
  };
};