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

// https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
var config = {
  modeBarButtonsToRemove: ['sendDataToCloud', 'toImage', 'zoom2d', 'pan2d', 
  'zoomIn2d', 'zoomOut2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
  displaylogo: false, 
  showTips: false
}

export default class DataChart extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { data, layout } = this.props;
    renderNewPlot(this.node, makeData(data), layout, config);
  };

  componentWillReceiveProps(nextProps) {
    const { data, layout } = nextProps;
    if(data !== this.props.data ||
      layout !== this.props.layout) {
      renderNewPlot(this.node, makeData(data), layout, config);
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