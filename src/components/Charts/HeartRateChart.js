import React, { Component } from 'react';
import { connect } from 'react-redux';
import getXYRunData from '../../selectors/getXYRunData';
import DataChart from './DataChart';

const layout = {
  title: 'Heart Rate',
  xaxis: {
    title: 'Seconds after Start'
  },
  yaxis: {
    title: 'Heart Rate (beats/min)',
    fixedrange: true
  }
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'heartRate'
  });
  return {
    data: getXYRunData(state, props)
  };
};

@connect(mapStateToProps)
export default class HeartRateChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return <DataChart data={this.props.data} layout={layout}/>;
  };
};