import React, { Component } from 'react';
import TrendChart from './Charts/TrendChart';

const metrics = [{
  key: 'pace',
  title: 'Average Pace',
  units: 'km/m',
  color: '#2196F3',
  icon: 'directions_run'
}, {
  key: 'heartRate',
  title: 'Average Heart Rate',
  units: 'beats/min',
  color: '#D32F2F',
  icon: 'favorite'
}, {
  key: 'elevation',
  title: 'Average Elevation',
  units: 'm',
  color: '#FFA000',
  icon: 'terrain'
}, {
  key: 'distance',
  title: 'Total Distance',
  units: 'km',
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
          return (
            <TrendChart
              key={metric.key}
              chartTitle={metric.title}
              icon={metric.icon}
              xTitle="Date"
              yTitle={`${metric.title} (${metric.units})`}
              metric={metric.key}
              clusterType={clusterType}
              color={metric.color}/>
          );
        })}
      </div>
    );
  };
};