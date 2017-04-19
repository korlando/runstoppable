import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunData from '../../selectors/getXYRunData';
import getAvgRunData from '../../selectors/getAvgRunData';

import DataChart from './DataChart';
import BigStat from '../BigStat';

const color = '#2196F3';
const layout = {
  xaxis: {
    title: 'Minutes after Start'
  },
  yaxis: {
    title: 'Pace (km/h)',
    fixedrange: true
  },
  margin: defaultChartMargin
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'pace'
  });
  return {
    data: getXYRunData(state, props),
    avgPace: getAvgRunData(state, {
      key: 'pace',
      runId: props.runId
    })
  };
};

@connect(mapStateToProps)
export default class PaceChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { avgPace } = this.props;
    
    return (
      <div>
        <div className="flexbox align-items-baseline">
          <h4 className="flex1 flexbox align-items-center"
            style={{ margin: '0', color }}>
            <i className="material-icons">directions_run</i>
            <span style={{ marginLeft: '6px'}}>Pace</span>
          </h4>
          <div className="text-light"
            style={{ marginRight: '6px' }}>Average</div>
          <BigStat stat={avgPace} units="km/h"/>
        </div>
        <DataChart
          data={this.props.data}
          layout={layout}
          color={color}/>
      </div>
    );
  };
};