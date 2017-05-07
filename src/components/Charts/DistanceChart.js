import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';

import { setTraceVisibility, roundTo } from '../../util';
import DataChart from './DataChart';
import BigStat from '../BigStat';
import MultiAvg from './MultiAvg';

const colors = ['#43A047','#2D6C30','#6FC373','#40FF00'];
const color = colors[0];
const layout = {
  autosize: true,
  height: 400,
  xaxis: {
    autorange: true,
    title: 'Minutes after Start'
  },
  yaxis: {
    title: 'Distance (km)',
    fixedrange: true
  },
  margin: defaultChartMargin,
  showlegend: false
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'distance'
  });
  const runMap = state.run.runMap;
  const datas = getXYRunDatas(state, props);
  const avgData = props.runIds.reduce((obj, id) => {
    const run = runMap[id];
    const total = run ? roundTo(run.checkpoints[run.checkpoints.length - 1].distance, 2) : 0;
    return {
      total: obj.total + total,
      avgTotals: [...obj.avgTotals, {
        avg: total, id
      }]
    };
  }, { total: 0, avgTotals: [] });

  return {
    datas,
    totalDistances: avgData.avgTotals,
    totalDistance: roundTo(avgData.total, 2)
  };
};

@connect(mapStateToProps)
export default class DistanceChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { datas, totalDistance, totalDistances } = this.props;
    
    return (
      <div>
        <div className="flexbox align-items-baseline"
          style={{ paddingBottom: '5px' }}>
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
          colors={colors}
          ref={(node) => { this.chart = node; }}/>
        { totalDistances.length > 1 &&
          <MultiAvg avgData={totalDistances} 
            text="Total Dist:"
            onRunToggled={(traceId, visible) => {
              setTraceVisibility(this.chart.node, traceId, visible);
            }}/>
        }
      </div>
    );
  };
};