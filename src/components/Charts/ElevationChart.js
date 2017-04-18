import React, { Component } from 'react';
import { connect } from 'react-redux';

import getXYRunData from '../../selectors/getXYRunData';
import getAvgRunData from '../../selectors/getAvgRunData';

import DataChart from './DataChart';
import BigStat from '../BigStat';

const color = '#FFA000';
const layout = {
  xaxis: {
    title: 'Minutes after Start'
  },
  yaxis: {
    title: 'Elevation (m)',
    fixedrange: true
  },
  margin: {
    t: 36
  }
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'elevation'
  });
  return {
    data: getXYRunData(state, props),
    avgElevation: getAvgRunData(state, {
      key: 'elevation',
      runId: props.runId
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
          data={this.props.data}
          layout={layout}
          color={color}/>
      </div>
    );
  };
};