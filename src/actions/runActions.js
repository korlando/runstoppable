export const addBulkRuns = (runs) => {
  return {
    type: 'ADD_BULK_RUNS',
    runs
  };
};

export const editAllRunsSort = (allRunsSort) => {
  return {
    type: 'EDIT_ALL_RUNS_SORT',
    allRunsSort
  };
};