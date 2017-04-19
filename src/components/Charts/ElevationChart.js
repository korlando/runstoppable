import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import getAvgRunData from '../../selectors/getAvgRunData';

import DataChart from './DataChart';
import BigStat from '../BigStat';

const color = '#FFA000';
const layout = {
  autosize: true,
  width: 700,
  height: 300,
  xaxis: {
    autorange: true,
    title: 'Minutes after Start'
  },
  yaxis: {
    title: 'Elevation (m)',
    fixedrange: true
  },
  margin: defaultChartMargin
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'elevation'
  });
  return {
    datas: getXYRunDatas(state, props),
    avgElevation: getAvgRunData(state, {
      key: 'elevation',
      runId: props.runIds[0] //TO DO: FIX THIS
    })
  };
};

@connect(mapStateToProps)
export default class ElevationChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { avgElevation } = this.props;
    
    return (
      <div>
        <div className="flexbox align-items-baseline">
          <h4 className="flex1 flexbox align-items-center"
            style={{ margin: '0', color }}>
            <i className="material-icons">terrain</i>
            <span style={{ marginLeft: '6px'}}>Elevation</span>
          </h4>
          <div className="text-light"
            style={{ marginRight: '6px' }}>Average</div>
          <BigStat stat={avgElevation} units="m"/>
        </div>
        <DataChart
          datas={this.props.datas}
          layout={layout}
          color={color}/>
      </div>
    );
  };
};