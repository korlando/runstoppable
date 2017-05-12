import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderNewPlot } from '../../util';
import runColors from '../../constants/runColors';

const makeDatas = (datas, color) =>
  datas.reduce((arr, data, i) => [...arr, {
    x: data.x,
    y: data.y,
    name: data.name,
    type: 'scatter',
    connectgaps: true,
    line: {
      color: datas.length === 1 ? color : runColors[i % runColors.length]
    }
  }], []);

export default class DataChart extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { datas, layout, color } = this.props;
    renderNewPlot(
      this.node,
      makeDatas(datas, color),
      layout
    );
    this.handleResize = () => {
      Plotly.Plots.resize(this.node);
    };
    
    window.addEventListener('sidebar', this.handleResize);
    window.addEventListener('resize', this.handleResize);
  };
  
  componentWillUnmount() {
    window.removeEventListener('sidebar', this.handleResize);
    window.removeEventListener('resize', this.handleResize);
  };

  componentWillReceiveProps(nextProps) {
    const { datas, layout, color } = nextProps;
    if(datas !== this.props.datas ||
      layout !== this.props.layout) {
      renderNewPlot(
        this.node,
        makeDatas(datas, color),
        layout
      );
    }
  };

  render() {
    return <div className="graph" ref={node => this.node = node}></div>;
  };
};