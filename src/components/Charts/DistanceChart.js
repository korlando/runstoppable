import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunData from '../../selectors/getXYRunData';
import getTotalRunData from '../../selectors/getTotalRunData';

import DataChart from './DataChart';
import BigStat from '../BigStat';

const color = '#43A047';
const layout = {
  autosize: true,
  width: 700,
  height: 300,
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
  const data = getXYRunData(state, props);
  return {
    data,
    totalDistance: Math.round(data.y[data.y.length - 1] * 100) / 100
  };
};

@connect(mapStateToProps)
export default class DistanceChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { data, totalDistance } = this.props;
    
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
          data={data}
          layout={layout}
          color={color}/>
      </div>
    );
  };
};