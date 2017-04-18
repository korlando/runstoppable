import { createSelector } from 'reselect';
import getSortFunction from './getSortFunction';

const getRunMap = (state) => state.run.runMap;

export default createSelector(
  [ getRunMap, getSortFunction ],
  (runMap, sortFunction) => {
    return Object
    .keys(runMap)
    .sort(sortFunction)
    .reduce((arr, runId) => {
      return [...arr, runMap[runId]];
    }, []);
  }
);