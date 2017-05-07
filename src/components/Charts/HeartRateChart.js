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

const KEY = 'heartRate';
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
    let numValid = obj.numValid;
    if(avg !== null) {
      numValid += 1
    }
    return {
      total: obj.total + avg,
      avgHeartRates: [...obj.avgHeartRates, {
        avg: avg === null ? 'Missing Data' : avg, id
      }],
      numValid
    };
  }, { total: 0, avgHeartRates: [], numValid: 0 });

  return {
    datas: getXYRunDatas(state, props),
    avgHeartRates: avgData.avgHeartRates,
    avgHeartRate: roundTo(avgData.total / avgData.numValid, 2)
  };
};

@connect(mapStateToProps)
export default class HeartRateChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { avgHeartRate, avgHeartRates } = this.props;
    
    return (
      <div>
        <ChartHeader
          icon={icon}
          color={color}
          title={name}
          statLabel="Average"
          stat={avgHeartRate}
          units={units}/>
        <DataChart
          datas={this.props.datas}
          layout={layout}
          color={color}
          ref={(node) => { this.chart = node; }}/>
        { avgHeartRates.length > 1 &&
          <MultiAvg avgData={avgHeartRates}
            text={title}
            onRunToggled={(traceId, visible) => {
              setTraceVisibility(this.chart.node, traceId, visible);
            }}/>
        }
      </div>
    );
  };
};