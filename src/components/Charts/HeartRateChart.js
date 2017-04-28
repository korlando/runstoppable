import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultChartMargin from '../../constants/defaultChartMargin';

import getXYRunDatas from '../../selectors/getXYRunDatas';
import getAvgRunData from '../../selectors/getAvgRunData';

import DataChart from './DataChart';
import BigStat from '../BigStat';
import MultiAvg from './MultiAvg';

const colors = ['#D32F2F','#e48181','#931f1f','#ff471a'];
const color = colors[0];
const layout = {
  autosize: true,
  height: 400,
  xaxis: {
    autorange: true,
    title: 'Minutes after Start'
  },
  yaxis: {
    title: 'Heart Rate (beats/min)',
    fixedrange: true
  },
  margin: defaultChartMargin
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'heartRate'
  });
  const avgData = props.runIds.reduce((obj, id) => {
    const avg = getAvgRunData(state, {
      key: 'heartRate',
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
    avgHeartRate: Math.round(avgData.total / avgData.numValid * 100) / 100
  };
};

@connect(mapStateToProps)
export default class HeartRateChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { avgHeartRate, avgHeartRates } = this.props;
    const invalidStat = Number.isNaN(avgHeartRate) || avgHeartRate === null;
    
    return (
      <div>
        <div className="flexbox align-items-baseline"
          style={{ paddingBottom: '5px' }}>
          <h4 className="flex1 flexbox align-items-center"
            style={{ margin: '0', color }}>
            <i className="material-icons">favorite</i>
            <span style={{ marginLeft: '6px'}}>Heart Rate</span>
          </h4>
          { !invalidStat &&
            <div className="text-light"
              style={{ marginRight: '6px' }}>Average</div>
          }
          { invalidStat ?
            <BigStat stat="Missing Data"/> : 
            <BigStat stat={avgHeartRate} units="beats/min"/>
          }
        </div>
        <DataChart
          datas={this.props.datas}
          layout={layout}
          colors={colors}/>
        { avgHeartRates.length > 1 &&
          <MultiAvg avgData={avgHeartRates} text="Avg. Heart Rate:"/>
        }
      </div>
    );
  };
};