import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderNewPlot } from '../../util';

const makeData = (data, color) => {
  return [{
    x: data.x,
    y: data.y,
    type: 'scatter',
    line: {
      color
    }
  }];
};

const makeDatas = (datas, color) =>
  datas.reduce((arr, data, index) => [...arr, {
    x: data.x,
    y: data.y,
    type: 'scatter',
    line: {
      color
    }
  }], []);

// https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
const config = {
  modeBarButtonsToRemove: ['sendDataToCloud', 'zoom2d', 'pan2d', 
  'zoomIn2d', 'zoomOut2d', 'toggleSpikelines',
  'hoverClosestCartesian', 'hoverCompareCartesian'],
  displaylogo: false, 
  displayModeBar: true,
  showTips: false
};

export default class DataChart extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { datas, layout, color } = this.props;
    renderNewPlot(this.node, makeDatas(datas, color), layout, config);
  };

  componentWillReceiveProps(nextProps) {
    const { datas, layout, color } = nextProps;
    if(datas !== this.props.datas ||
      layout !== this.props.layout) {
      renderNewPlot(this.node, makeDatas(datas, color), layout, config);
    }
  };

  render() {
    return <div ref={div => this.node = div}></div>;
  };
};