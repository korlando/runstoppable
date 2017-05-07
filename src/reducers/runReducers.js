const defaultState = {
  runMap: {},
  allRunsSort: '-start',
  index: 0,
  maxRuns: 5
};

export default (state = defaultState, action) => {
  let newRuns, index;

  switch(action.type) {
    // requires: {Object} action.runs
    case 'ADD_BULK_RUNS':
      newRuns = {};
      index = state.index;
      const runArray = Array.isArray(action.runs) ?
        action.runs : Object.keys(action.runs).reduce((arr, key) => [...arr, action.runs[key]], []);
      runArray.forEach((run) => {
        // give each run an ID
        // NOTE: remove for production-ready data from DB
        newRuns[index] = Object.assign({}, run, {
          id: index,
          name: `Run ${index}`
        });
        index += 1;
      });
      return Object.assign({}, state, {
        runMap: Object.assign({}, state.runMap, newRuns),
        index
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

    default:
      return state;
  }
};