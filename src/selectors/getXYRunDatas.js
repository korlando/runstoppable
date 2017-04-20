import { createSelector } from 'reselect';

const getRunMap = (state) => state.run.runMap;
const getRunIds = (state, props) => props.runIds;
const getKey = (state, props) => props.key;

export default createSelector(
  [ getRunMap, getRunIds, getKey ], (runMap, runIds, key) => {
    const datas = [];
    
    runIds.forEach((runId, index) => {
      const data = { x: [], y: [], name: "run" + index};
      const run = runMap[runId];

      if(run) {
        run.checkpoints.forEach((c) => {
          data.x.push(c.seconds / 60);
          data.y.push(c[key]);
        });
      }
      datas.push(data);
    });
    
    return datas;
  }
);