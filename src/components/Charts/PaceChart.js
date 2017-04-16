import React, { Component } from 'react';
import { connect } from 'react-redux';
import getXYRunData from '../../selectors/getXYRunData';
import DataChart from './DataChart';

const layout = {
  title: 'Pace',
  xaxis: {
    title: 'Seconds after Start'
  },
  yaxis: {
    title: 'Pace (km/h)',
    fixedrange: true
  }
};

const mapStateToProps = (state, ownProps) => {
  const props = Object.assign({}, ownProps, {
    key: 'pace'
  });
  return {
    data: getXYRunData(state, props)
  };
};

@connect(mapStateToProps)
export default class PaceChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return <DataChart data={this.props.data} layout={layout}/>;
  };
};