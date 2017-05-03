import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import getAvgRunData from '../../selectors/getAvgRunData';

import { setTraceVisibility } from '../../util';
import DataChart from './DataChart';
import BigStat from '../BigStat';
import MultiAvg from './MultiAvg';

const colors = ['#FFA000','#ffc766','#b37100','#ffcc00'];
const color = colors[0];
const layout = {
  autosize: true,
  height: 400,
  xaxis: {
    autorange: true,
    title: 'Minutes after Start'
  },
  yaxis: {
    title: 'Elevation (m)',
    fixedrange: true
  },
  margin: defaultChartMargin,
  showlegend: false
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'elevation'
  });
  const avgData = props.runIds.reduce((obj, id) => {
    const avg = getAvgRunData(state, {
      key: 'elevation',
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
    avgElevation: Math.round(avgData.total / props.runIds.length * 100) / 100
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
        <div className="flexbox align-items-baseline"
          style={{ paddingBottom: '5px' }}>
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
          colors={colors}
          ref={(node) => { this.chart = node; }}/>
        { avgElevations.length > 1 &&
          <MultiAvg avgData={avgElevations}
            text="Avg. Elevation:"
            onRunToggled={(traceId, visible) => {
              setTraceVisibility(this.chart.node, traceId, visible);
            }}/>
        }
      </div>
    );
  };
};