import * as sidebarActions from './actions/sidebarActions';
import * as modalActions from './actions/modalActions';
import * as runActions from './actions/runActions';
import store from './store/store';

export const toggleSidebar = () => {
  store.dispatch(sidebarActions.toggleSidebar());
};

export const toggleModal = () => {
  store.dispatch(modalActions.toggleModal());
};

export const dispatchAddBulkRuns = (runs) => {
  store.dispatch(runActions.addBulkRuns(runs));
};

export const renderNewPlot = (node, data, layout) => {
  Plotly.newPlot(node, data, layout);
};