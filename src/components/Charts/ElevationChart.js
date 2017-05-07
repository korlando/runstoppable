import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import getAvgRunData from '../../selectors/getAvgRunData';
import metrics from '../../constants/metrics';
import { setTraceVisibility, roundTo } from '../../util';

import DataChart from './DataChart';
import ChartHeader from './ChartHeader';
import MultiAvg from './MultiAvg';

const KEY = 'elevation';
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
  const props = Object.assign({}, ownProps, {
    key: KEY
  });
  const avgData = props.runIds.reduce((obj, id) => {
    const avg = getAvgRunData(state, {
      key: KEY,
      runId: id
    });
    return {
      total: obj.total + avg,
      avgElevations: [...obj.avgElevations, {
        avg, id
      }]
    };
  }, { total: 0, avgElevations: [] });

  return {
    datas: getXYRunDatas(state, props),
    avgElevations: avgData.avgElevations,
    avgElevation: roundTo(avgData.total / props.runIds.length, 2)
  };
};

@connect(mapStateToProps)
export default class ElevationChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { avgElevation, avgElevations } = this.props;
    
    return (
      <div>
        <ChartHeader
          icon={icon}
          color={color}
          title={name}
          statLabel="Average"
          stat={avgElevation}
          units={units}/>
        <DataChart
          datas={this.props.datas}
          layout={layout}
          color={color}
          ref={(node) => { this.chart = node; }}/>
        { avgElevations.length > 1 &&
          <MultiAvg avgData={avgElevations}
            text={title}
            onRunToggled={(traceId, visible) => {
              setTraceVisibility(this.chart.node, traceId, visible);
            }}/>
        }
      </div>
    );
  };
};