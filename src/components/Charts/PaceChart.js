import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderNewPlot } from '../../util';
import getPaceData from '../../selectors/getPaceData';

const makePaceData = (data) => {
  return [{
    x: data.x,
    y: data.y,
    type: 'scatter'
  }];
};

const layout = {
  title: 'Pace'
};

const mapStateToProps = (state, ownProps) => {
  return {
    data: getPaceData(state, ownProps)
  };
};

@connect(mapStateToProps)
export default class PaceChart extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    renderNewPlot(this.node, makePaceData(this.props.data), layout);
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      renderNewPlot(this.node, makePaceData(nextProps.data), layout);
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