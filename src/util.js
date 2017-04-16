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

// https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
var config = {
  modeBarButtonsToRemove: ['sendDataToCloud', 'toImage', 'zoom2d', 'pan2d', 
  'zoomIn2d', 'zoomOut2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
  displaylogo: false, 
  showTips: false
}

export const renderNewPlot = (node, data, layout) => {
  Plotly.newPlot(node, data, layout, config);
};