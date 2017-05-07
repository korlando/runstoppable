import React, { Component } from 'react';
import TrendChart from './Charts/TrendChart';
import metrics from '../constants/metrics';

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