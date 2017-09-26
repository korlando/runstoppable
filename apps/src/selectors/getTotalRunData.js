import { createSelector } from 'reselect';
import getXYRunData from './getXYRunData';

export default createSelector(
  [ getXYRunData ],
  (runData) => {
    return runData.y.reduce((total, value) => {
      return total + value;
    }, 0);
  }
);