import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import metrics from '../../constants/metrics';
import { setTraceVisibility, roundTo } from '../../util';

import DataChart from './DataChart';
import ChartHeader from './ChartHeader';
import MultiAvg from './MultiAvg';

const KEY = 'distance';
const metric = metrics.find(m => m.key === KEY);
const { name, title, color, icon, units } = metric;
const layout = {
  autosize: true,
  height: 400,
  xaxis: {
    autorange: true,
    title: 'Minutes after Start'
  },
  yaxis: {
    title: `${name} (${units})`,
    fixedrange: true
  },
  margin: defaultChartMargin,
  showlegend: false
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, { key: KEY });
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
        <ChartHeader
          icon={icon}
          color={color}
          title={name}
          statLabel="Total"
          stat={totalDistance}
          units={units}/>
        <DataChart
          datas={datas}
          layout={layout}
          color={color}
          ref={(node) => { this.chart = node; }}/>
        { totalDistances.length > 1 &&
          <MultiAvg avgData={totalDistances} 
            text={title}
            onRunToggled={(traceId, visible) => {
              setTraceVisibility(this.chart.node, traceId, visible);
            }}/>
        }
      </div>
    );
  };
};