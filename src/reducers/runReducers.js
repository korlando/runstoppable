const defaultState = {
  runMap: {},
  allRunsSort: '-start',
  index: 0
};

export default (state = defaultState, action) => {
  let newRuns, index;

  switch(action.type) {
    // requires: {Object} action.runs
    case 'ADD_BULK_RUNS':
      newRuns = {};
      index = state.index;
      Object.keys(action.runs).forEach((key) => {
        // give each run an ID
        // NOTE: remove for production-ready data from DB
        newRuns[index] = Object.assign({}, action.runs[key], {
          id: index
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

    default:
      return state;
  }
};