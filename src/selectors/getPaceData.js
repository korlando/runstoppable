import { createSelector } from 'reselect';

const getRunMap = (state) => state.run.runMap;
const getRunId = (state, props) => props.runId;

export default createSelector(
  [ getRunMap, getRunId ],
  (runMap, runId) => {
    const data = { x: [], y: [] };
    const run = runMap[runId];

    if(run) {
      run.checkpoints.forEach((c) => {
        data.x.push(c.seconds);
        data.y.push(c.pace);
      });
    }

    return data;
  }
);