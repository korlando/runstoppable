import { createSelector } from 'reselect';

const getRunMap = (state) => state.run.runMap;
const getKey = (state, props) => props.key;

export default createSelector(
  [ getRunMap, getKey ],
  (runMap, key) => {
    switch(key) {
      case 'start':
        return (a, b) => {
          const runA = runMap[a];
          const runB = runMap[b];

          if(runA.start.isBefore(runB.start)) {
            return -1;
          }
          if(runB.start.isBefore(runA.start)) {
            return 1;
          }
          return a - b;
        };

      case 'distance':
        return (a, b) => {
          const runA = runMap[a];
          const runB = runMap[b];
          const distanceA = runA.checkpoints[runA.checkpoints.length - 1].distance;
          const distanceB = runB.checkpoints[runB.checkpoints.length - 1].distance;

          if(distanceA < distanceB) {
            return 1;
          } else if(distanceA > distanceB) {
            return -1;
          }

          return runA.id - runB.id;
        };

      default:
        return (a, b) => {
          const runA = runMap[a];
          const runB = runMap[b];
          const valA = runA[key];
          const valB = runB[key];

          if(valA > valB) {
            return -1;
          }
          if(valA < valB) {
            return 1;
          }

          return runA.id - runB.id;
        };
    }
  }
);