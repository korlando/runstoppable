import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderNewPlot } from '../../util';

const makeData = (data) => {
  return [{
    x: data.x,
    y: data.y,
    type: 'scatter'
  }];
};

export default class DataChart extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { data, layout } = this.props;
    renderNewPlot(this.node, makeData(data), layout);
  };

  componentWillReceiveProps(nextProps) {
    const { data, layout } = nextProps;
    if(data !== this.props.data ||
      layout !== this.props.layout) {
      renderNewPlot(this.node, makeData(data), layout);
    }
  };

  render() {
    return (
      <div>
        <div ref={div => this.node = div}></div>
      </div>
    );
  };
};