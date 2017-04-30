import { createSelector } from 'reselect';
import moment from 'moment';

const getMetric = (state, props) => props.metric;
const getDayClusterSize = (state, props) => props.dayClusterSize;
const getClusterType = (state, props) => props.clusterType;
const getRunMap = (state) => state.run.runMap;

export default createSelector(
  [ getMetric,
    getDayClusterSize,
    getClusterType,
    getRunMap ],
  (metric, dayClusterSize, clusterType, runMap) => {
    const data = {
      x: [], y: []
    };
    if(!metric) {
      return data;
    }
    if(!dayClusterSize) {
      dayClusterSize = 1;
    }
    if(!clusterType) {
      clusterType = 'average';
    }

    const runIds = Object.keys(runMap);
    if(runIds.length === 0) {
      return data;
    }

    // sort by start date (recent first)
    runIds.sort((a, b) => {
      const runA = runMap[a];
      const runB = runMap[b];

      if(runA.start.isBefore(runB.start)) {
        return 1;
      }
      if(runB.start.isBefore(runA.start)) {
        return -1;
      }
      return a - b;
    });

    // create cutoff dates
    const startDate = runMap[runIds[0]].start.clone().endOf('day');
    const endDate = runMap[runIds[runIds.length - 1]].start.clone().startOf('day');
    const dateCutoffs = [startDate];
    let numDays = dayClusterSize;
    while(dateCutoffs[dateCutoffs.length - 1].isAfter(endDate)) {
      dateCutoffs.push(startDate.clone().subtract(numDays, 'days'));
      numDays += dayClusterSize;
    }

    // create data
    let startIndex = 0;
    for(let i = 0; i < dateCutoffs.length - 1; i++) {
      const upperBound = dateCutoffs[i];
      const lowerBound = dateCutoffs[i + 1];
      let clusterTotal = 0;
      let numPoints = 0;

      for(let j = startIndex; j < runIds.length; j++) {
        const run = runMap[runIds[j]];
        if(run.start.isBefore(upperBound) && run.start.isAfter(lowerBound)) {
          if(metric === 'distance' && clusterType === 'total') {
            numPoints += 1;
            clusterTotal += run.checkpoints[run.checkpoints.length - 1].distance;
          } else {
            numPoints += run.checkpoints.length;
            clusterTotal += run.checkpoints.reduce((total, c) => {
              return total + (c[metric] || 0);
            }, 0);
          }
        } else {
          startIndex = j;
          break;
        }
      }

      const x = upperBound.format('M/D/YY');
      let y;
      switch(clusterType) {
        case 'average':
          if(numPoints === 0) {
            y = null;
          } else {
            y = clusterTotal / numPoints;
          }
          break;
        default:
          y = clusterTotal;
      }

      // round to 2 decimals
      y = Math.round(y * 100) / 100;
      data.x.push(x);
      data.y.push(y);
    }

    // reverse data for chart display
    data.x.reverse();
    data.y.reverse();

    return data;
  }
);