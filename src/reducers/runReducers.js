import moment from 'moment';

const defaultState = {
  runMap: {},
  allRunsSort: '-start',
  index: 0,
  maxRuns: 5
};

export default (state = defaultState, action) => {
  let newRuns, index, runMap;

  switch(action.type) {
    // requires: {Object} action.runs
    case 'ADD_BULK_RUNS':
      newRuns = {};
      const runArray = Array.isArray(action.runs) ?
        action.runs : Object.keys(action.runs).reduce((arr, key) => [...arr, action.runs[key]], []);
      const thisYear = new Date().getFullYear();
      runArray.forEach((run) => {
        // REQUIRES: run.id
        const rid = run.id;
        if(!rid) return;
        const start = moment(run.start);
        newRuns[rid] = Object.assign({}, run, {
          start,
          startFormatted: (start.year() !== thisYear) ?
            start.clone().format('MMMM D, YYYY, h:mm a') :
            start.clone().format('MMM D, h:mm a')
        });
      });
      return Object.assign({}, state, {
        runMap: Object.assign({}, state.runMap, newRuns),
      });

    case 'EDIT_ALL_RUNS_SORT':
      return Object.assign({}, state, {
        allRunsSort: action.allRunsSort
      });

    case 'EDIT_RUN':
      return Object.assign({}, state, {
        runMap: Object.assign({}, state.runMap, {
          [action.runId]: Object.assign({}, state.runMap[action.runId], action.changes)
        })
      });

    case 'DELETE_RUN':
      runMap = Object.assign({}, state.runMap);
      delete runMap[action.runId];
      return Object.assign({}, state, {
        runMap
      });

    default:
      return state;
  }
};