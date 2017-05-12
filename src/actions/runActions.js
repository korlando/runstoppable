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

export const editRun = (changes, runId) => {
  return {
    type: 'EDIT_RUN',
    changes,
    runId
  };
};

export const deleteRun = (runId) => {
  return {
    type: 'DELETE_RUN',
    runId,
  };
};