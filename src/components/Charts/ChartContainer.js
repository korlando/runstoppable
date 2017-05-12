import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import getAvgRunData from '../../selectors/getAvgRunData';
import metrics from '../../constants/metrics';
import { setTraceVisibility, roundTo, convertUnits } from '../../util';

import DataChart from './DataChart';
import ChartHeader from './ChartHeader';
import MultiStats from './MultiStats';

const mapStateToProps = (state, ownProps) => {
  const { metricId } = ownProps;
  const props = Object.assign({}, ownProps, { key: metricId });
  const runMap = state.run.runMap;
  
  const metric = metrics.find(m => m.key === metricId);
  const useTotal = metric.statLabel.toLowerCase() === 'total';

  const statData = props.runIds.reduce((obj, id) => {
    let stat;
    if(useTotal) {
      const run = runMap[id];
      stat = run ? roundTo(run.checkpoints[run.checkpoints.length - 1][metricId], 2) : 0;
    } else {
      stat = getAvgRunData(state, {
        key: metricId,
        runId: id
      });
    }
    let numValid = obj.numValid;
    if(stat !== null) {
      numValid += 1
    }
    return {
      total: obj.total + stat,
      stats: [...obj.stats, {
        stat, id
      }],
      numValid
    };
  }, { total: 0, stats: [], numValid: 0 });

  return {
    metric,
    runMap,
    datas: getXYRunDatas(state, props),
    stats: statData.stats,
    stat: useTotal ?
      roundTo(statData.total, 2) :
      roundTo(statData.total / statData.numValid, 2),
    user: state.user,
  };
};

@connect(mapStateToProps)
export default class ChartContainer extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { metric,
            stat,
            stats,
            user } = this.props;
    const { name,
            statLabel,
            color,
            icon } = metric;
    let units = metric.units;
    if(user.units === 'imperial') {
      units = convertUnits(units);
    }
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
    
    return (
      <div>
        <ChartHeader
          icon={icon}
          color={color}
          title={name}
          statLabel={statLabel}
          stat={stat}
          units={units}/>
        <DataChart
          datas={this.props.datas}
          layout={layout}
          color={color}
          ref={node => this.chart = node}/>
        { stats.length > 1 &&
          <MultiStats
            stats={stats}
            text={`${statLabel} (${units})`}
            onRunToggled={(traceId, visible) => {
              setTraceVisibility(this.chart.node, traceId, visible);
            }}/>
        }
      </div>
    );
  };
};