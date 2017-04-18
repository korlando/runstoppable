import { createSelector } from 'reselect';
import getXYRunData from './getXYRunData';
import getTotalRunData from './getTotalRunData';

// runData is { x: [...], y: [...] }
export default createSelector(
  [ getXYRunData, getTotalRunData ],
  (runData, total) => {
    // round to 2 decimal places
    return Math.round(total / runData.y.length * 100) / 100;
  }
);