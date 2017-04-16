import { createSelector } from 'reselect';
import getXYRunData from './getXYRunData';

// runData is { x: [...], y: [...] }
export default createSelector(
  [ getXYRunData ],
  (runData) => {
    // round to 2 decimal places
    return Math.round(runData.y.reduce((total, value) => {
      return total + value;
    }, 0) / runData.y.length * 100) / 100;
  }
);