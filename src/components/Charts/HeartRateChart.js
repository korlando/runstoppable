import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import getAvgRunData from '../../selectors/getAvgRunData';

import DataChart from './DataChart';
import BigStat from '../BigStat';

const colors = ['#D32F2F','#e48181','#931f1f','#ff471a'];
const color = colors[0];
const layout = {
  autosize: true,
  height: 400,
  xaxis: {
    autorange: true,
    title: 'Minutes after Start'
  },
  yaxis: {
    title: 'Heart Rate (beats/min)',
    fixedrange: true
  },
  margin: defaultChartMargin
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'heartRate'
  });
  return {
    datas: getXYRunDatas(state, props),
    avgHeartRate: getAvgRunData(state, {
      key: 'heartRate',
      runId: props.runIds[0] //TO DO: FIX THIS
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
          datas={this.props.datas}
          layout={layout}
          colors={colors}/>
      </div>
    );
  };
};