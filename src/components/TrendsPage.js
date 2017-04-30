import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrendChart from './Charts/TrendChart';

const metrics = [{
  key: 'pace',
  title: 'Pace',
  color: '#2196F3',
  icon: 'directions_run'
}, {
  key: 'heartRate',
  title: 'Heart Rate',
  color: '#D32F2F',
  icon: 'favorite'
}, {
  key: 'elevation',
  title: 'Elevation',
  color: '#FFA000',
  icon: 'terrain'
}, {
  key: 'distance',
  title: 'Distance',
  color: '#43A047',
  icon: 'timeline'
}];

export default class TrendsPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="page-container">
        <h1>Trends</h1>
        { metrics.map((metric) => {
          const clusterType = (metric.key === 'distance') ?
            'total' : 'average';
          const chartTitle = (metric.key === 'distance') ?
            'Total Distance' : 'Average ' + metric.title;
          return (
            <TrendChart
              key={metric.key}
              chartTitle={chartTitle}
              icon={metric.icon}
              xTitle="Date"
              yTitle={metric.title}
              metric={metric.key}
              clusterType={clusterType}
              color={metric.color}/>
          );
        })}
      </div>
    );
  };
};