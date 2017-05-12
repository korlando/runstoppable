import { createSelector } from 'reselect';

const getRunMap = (state) => state.run.runMap;
const getRunId = (state, props) => props.runId;
const getKey = (state, props) => props.key;
const getUnits = (state) => state.user.units;

const milesPerKm = 0.621371;
const ftPerM = 3.28084;

export default createSelector(
  [ getRunMap, getRunId, getKey, getUnits ],
  (runMap, runId, key, units) => {
    const data = { x: [], y: [] };
    const run = runMap[runId];

    if(run) {
      run.checkpoints.forEach((c) => {
        data.x.push(c.seconds / 60);
        let val = c[key];
        if(units === 'imperial') {
          switch(key) {
            case 'pace':
            case 'distance':
              val = milesPerKm * val;
              break;
            case 'elevation':
              val = ftPerM * val;
              break;
          }
        }
        data.y.push(val);
      });
    }

    return data;
  }
);