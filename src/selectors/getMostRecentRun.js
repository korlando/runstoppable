import { createSelector } from 'reselect';

const getRunMap = (state) => state.run.runMap;

export default createSelector(
  [ getRunMap ],
  (runMap) => {
    const sortedIds = Object.keys(runMap).sort((a, b) => {
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

    if(sortedIds.length) {
      return runMap[sortedIds[0]];
    }

    return null;
  }
);