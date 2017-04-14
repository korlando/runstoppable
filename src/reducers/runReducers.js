const defaultState = {
  runMap: {},
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

    default:
      return state;
  }
};