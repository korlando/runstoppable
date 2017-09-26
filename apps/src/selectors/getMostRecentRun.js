import { createSelector } from 'reselect';
import getSortedRunsByStart from './getSortedRunsByStart';

const getRunMap = (state) => state.run.runMap;

export default createSelector(
  [ getSortedRunsByStart ],
  (sortedRuns) => {
    if(sortedRuns.length) {
      return sortedRuns[0];
    }

    return null;
  }
);