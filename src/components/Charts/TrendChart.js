import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataChart from './DataChart';
import getTrendData from '../../selectors/getTrendData';
import defaultChartMargin from '../../constants/defaultChartMargin';

const layout = {
  autosize: true,
  height: 400,
  xaxis: {
    autorange: true
  },
  yaxis: {
    fixedrange: true
  },
  margin: defaultChartMargin
};

const mapStateToProps = (state, ownProps) => {
  return {
    xyData: getTrendData(state, ownProps)
  };
};

@connect(mapStateToProps)
export default class TrendChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { xyData,
            xTitle,
            yTitle,
            color,
            icon,
            chartTitle } = this.props;
    layout.xaxis.title = xTitle;
    layout.yaxis.title = yTitle;

    return (
      <div>
        <h2 className="flexbox align-items-center" style={{ color }}>
          <i className="material-icons" style={{ fontSize: '40px' }}>{icon}</i>
          <span style={{
            fontWeight: '300',
            fontSize: '30px',
            marginLeft: '10px'
          }}>{chartTitle}</span>
        </h2>
        <DataChart datas={[xyData]} layout={layout} colors={[color]}/>
      </div>
    );
  };
};