import { createSelector } from 'reselect';

const getRunMap = (state) => state.run.runMap;
const getRunId = (state, props) => props.runId;
const getKey = (state, props) => props.key;

export default createSelector(
  [ getRunMap, getRunId, getKey ],
  (runMap, runId, key) => {
    const data = { x: [], y: [] };
    const run = runMap[runId];

    if(run) {
      run.checkpoints.forEach((c) => {
        data.x.push(c.seconds / 60);
        data.y.push(c[key]);
      });
    }

    return data;
  }
);