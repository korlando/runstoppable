import { createSelector } from 'reselect';
import { roundTo } from '../util';

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
          data.x.push(roundTo(c.seconds / 60, 2));
          data.y.push(roundTo(c[key], 2));
        });
      }
      datas.push(data);
    });
    
    return datas;
  }
);