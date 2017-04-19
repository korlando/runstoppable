import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import getTotalRunData from '../../selectors/getTotalRunData';

import DataChart from './DataChart';
import BigStat from '../BigStat';

const color = '#43A047';
const layout = {
  autosize: true,
  width: 700,
  height: 500,
  xaxis: {
    autorange: true,
    title: 'Minutes after Start'
  },
  yaxis: {
    title: 'Distance (km)',
    fixedrange: true
  },
  margin: defaultChartMargin
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'distance'
  });
  const datas = getXYRunDatas(state, props);
  return {
    datas,
    //totalDistance: datas.reduce((total, data) => total + Math.round(data.y[data.y.length - 1] * 100) / 100), 0);
    totalDistance: Math.round(datas[0].y[datas[0].y.length - 1] * 100) / 100 // TO DO: FIX THIS
  };
};

@connect(mapStateToProps)
export default class DistanceChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { datas, totalDistance } = this.props;
    
    return (
      <div>
        <div className="flexbox align-items-baseline">
          <h4 className="flex1 flexbox align-items-center"
            style={{ margin: '0', color }}>
            <i className="material-icons">timeline</i>
            <span style={{ marginLeft: '6px'}}>Cumulative Distance</span>
          </h4>
          <div className="text-light"
            style={{ marginRight: '6px' }}>Total</div>
          <BigStat stat={totalDistance} units="km"/>
        </div>
        <DataChart
          datas={datas}
          layout={layout}
          color={color}/>
      </div>
    );
  };
};