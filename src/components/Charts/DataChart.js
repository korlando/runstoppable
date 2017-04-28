import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderNewPlot } from '../../util';
import runColors from '../../constants/runColors';

const makeDatas = (datas, colors) =>
  datas.reduce((arr, data, index) => [...arr, {
    x: data.x,
    y: data.y,
    name: data.name,
    type: 'scatter',
    line: {
      color: datas.length == 1 ? colors[index % colors.length] : runColors[index % runColors.length]
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
    const { datas, layout, colors } = this.props;
    renderNewPlot(this.node, makeDatas(datas, colors), layout, config);
    var plotThing = this.node;
    this.handleResize = function() {
      Plotly.Plots.resize(plotThing);
    }
    window.addEventListener('sidebar', this.handleResize);
  };
  
  componentWillUnmount() {
    window.removeEventListener('sidebar', this.handleResize);
  };

  componentWillReceiveProps(nextProps) {
    const { datas, layout, colors } = nextProps;
    if(datas !== this.props.datas ||
      layout !== this.props.layout) {
      renderNewPlot(this.node, makeDatas(datas, colors), layout, config);
    }
  };

  render() {
    return <div className="graph" ref={div => this.node = div}></div>;
  };
};