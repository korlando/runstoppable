import * as sidebarActions from './actions/sidebarActions';
import * as runActions from './actions/runActions';
import store from './store/store';

export const toggleSidebar = () => {
  store.dispatch(sidebarActions.toggleSidebar());
};

export const dispatchAddBulkRuns = (runs) => {
  store.dispatch(runActions.addBulkRuns(runs));
};