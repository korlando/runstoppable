import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import getAvgRunData from '../../selectors/getAvgRunData';

import { setTraceVisibility } from '../../util';
import DataChart from './DataChart';
import BigStat from '../BigStat';
import MultiAvg from './MultiAvg';

const colors = ['#2196F3','#86c5f9','#0961aa','#1a1aff'];
const color = colors[0];
const layout = {
  autosize: true,
  height: 400,
  xaxis: {
    autorange: true,
    title: 'Minutes after Start'
  },
  yaxis: {
    title: 'Pace (km/h)',
    fixedrange: true
  },
  margin: defaultChartMargin,
  showlegend: false
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'pace'
  });
  const avgData = props.runIds.reduce((obj, id) => {
    const avg = getAvgRunData(state, {
      key: 'pace',
      runId: id
    });
    return {
      total: obj.total + avg,
      avgPaces: [...obj.avgPaces, {
        avg, id
      }]
    };
  }, { total: 0, avgPaces: [] });
  
  return {
    datas: getXYRunDatas(state, props),
    avgPaces: avgData.avgPaces,
    avgPace: Math.round(avgData.total / props.runIds.length * 100) / 100,
    runMap: state.run.runMap
  };
};

@connect(mapStateToProps)
export default class PaceChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { avgPace, avgPaces } = this.props;
    
    return (
      <div>
        <div className="flexbox align-items-baseline"
          style={{ paddingBottom: '5px' }}>
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
          colors={colors}
          ref={(node) => { this.chart = node; }}/>
        { avgPaces.length > 1 &&
          <MultiAvg avgData={avgPaces}
            text="Avg. Pace:"
            onRunToggled={(traceId, visible) => {
              setTraceVisibility(this.chart.node, traceId, visible);
            }}/>
        }
      </div>
    );
  };
};