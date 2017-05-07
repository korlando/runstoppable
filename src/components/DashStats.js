import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { roundTo } from '../util';
import getTrendData from '../selectors/getTrendData';
import BigTime from './BigTime';
import BigStat from './BigStat';

const getTotal = (data) => {
  return roundTo(data.y.reduce((total, y) => total + y, 0), 2);
};

const getAverage = (data, type) => {
  const result = data.y.reduce((obj, y) => {
    if(y === null || (y === 0 && type === 'heartRate')) {
      return {
        total: obj.total,
        count: obj.count
      };
    }
    return {
      total: obj.total + y,
      count: obj.count + 1
    }
  }, { total: 0, count: 0 });
  return roundTo(result.total / result.count, 2);
};

const mapStateToProps = (state) => {
  const today = moment().endOf('day');
  const bounds = {
    day: today.clone().subtract(1, 'days'),
    week: today.clone().subtract(7, 'days'),
    month: today.clone().subtract(1, 'months'),
    year: today.clone().subtract(1, 'years')
  };
  const props = {
    name: state.user.name,
    stats: []
  };
  Object.keys(bounds).forEach((key) => {
    const timeData = getTrendData(state, {
      metric: 'time',
      clusterType: 'total',
      upper: today,
      lower: bounds[key]
    });
    const distanceData = getTrendData(state, {
      metric: 'distance',
      clusterType: 'total',
      upper: today,
      lower: bounds[key]
    });
    const paceData = getTrendData(state, {
      metric: 'pace',
      upper: today,
      lower: bounds[key]
    });
    const heartRateData = getTrendData(state, {
      metric: 'heartRate',
      upper: today,
      lower: bounds[key]
    });
    props.stats.push({
      title: 'Past ' + key[0].toUpperCase() + key.slice(1),
      time: getTotal(timeData),
      distance: getTotal(distanceData),
      pace: getAverage(distanceData),
      heartRate: getAverage(heartRateData, 'heartRate') 
    });
  });
  
  return props;
};

@connect(mapStateToProps)
export default class DashStats extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { name, stats } = this.props;
    
    return (
      <div>
        <h3>Welcome back, {name.split(' ', 1)}</h3>
        <div className="dashboard-stats">
          <div className="flexbox align-items-baseline row-stats">
            <label className="column"></label>
            <label className="column">Time</label>
            <label className="column">Distance</label>
            <label className="column">Pace</label>
            <label className="column">Heart Rate</label>
          </div>
          { stats.map((stat, i) => {
            const { time } = stat;
            const hours = Math.floor(time / 3600);
            const minutes = Math.round((time - (hours * 3600)) / 60);
            
            return (
              <div key={i}
                className="flexbox align-items-baseline row-stats">
                <label className="column">{stat.title}</label>
                <BigTime className="column" hours={hours} minutes={minutes}/>
                <BigStat className="column" stat={stat.distance} units="km"/>
                <BigStat className="column" stat={stat.pace} units="km/h"/>
                { Number.isNaN(stat.heartRate) ?
                  <div className="column text-light">Missing Data</div> :
                  <BigStat className="column" stat={stat.heartRate} units="beats/min"/>
                }
              </div>
            );
          })}
        </div>
      </div>
    );
  };
};