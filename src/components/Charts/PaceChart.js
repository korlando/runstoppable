import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import getAvgRunData from '../../selectors/getAvgRunData';

import DataChart from './DataChart';
import BigStat from '../BigStat';

const colors = ['#2196F3','#86c5f9','#0961aa','#1a1aff'];
const color = colors[0];
const layout = {
  autosize: true,
  width: 1000,
  height: 300,
  xaxis: {
    autorange: true,
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
    datas: getXYRunDatas(state, props),
    avgPace: getAvgRunData(state, {
      key: 'pace',
      runId: props.runIds[0] //TO DO: FIX THIS
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
          datas={this.props.datas}
          layout={layout}
          colors={colors}/>
      </div>
    );
  };
};