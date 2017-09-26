import { createSelector } from 'reselect';
import getXYRunData from './getXYRunData';
import getTotalRunData from './getTotalRunData';
import { roundTo } from '../util';

// runData is { x: [...], y: [...] }
export default createSelector(
  [ getXYRunData, getTotalRunData ],
  (runData, total) => {
    const numPoints = runData.y.reduce((pts, num) => {
      return num === null ? pts : pts + 1;
    }, 0);
    if(numPoints === 0) return null;
    // round to 2 decimal places
    return roundTo(total / numPoints, 2);
  }
);