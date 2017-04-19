import * as sidebarActions from './actions/sidebarActions';
import * as modalActions from './actions/modalActions';
import * as runActions from './actions/runActions';
import * as menuActions from './actions/menuActions';
import store from './store/store';
import runColors from './constants/runColors';

export const toggleSidebar = () => {
  store.dispatch(sidebarActions.toggleSidebar());
};

export const toggleModal = () => {
  store.dispatch(modalActions.toggleModal());
};

export const dispatchAddBulkRuns = (runs) => {
  store.dispatch(runActions.addBulkRuns(runs));
};

export const editAllRunsSort = (sort) => {
  store.dispatch(runActions.editAllRunsSort(sort));
};

export const toggleMenu = (name, e, preventCloseAll) => {
  if(e) e.stopPropagation();
  store.dispatch(menuActions.toggleMenu(name, preventCloseAll));
};

export const closeAllMenus = () => {
  store.dispatch(menuActions.closeAllMenus());
};

// https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
const config = {
  modeBarButtonsToRemove: ['sendDataToCloud', 'zoom2d', 'pan2d', 
  'zoomIn2d', 'zoomOut2d', 'toggleSpikelines',
  'hoverClosestCartesian', 'hoverCompareCartesian'],
  displaylogo: false, 
  displayModeBar: true,
  showTips: false
};

export const renderNewPlot = (node, data, layout) => {
  Plotly.newPlot(node, data, layout, config);
};

export const renderRunPath = (node, runs, draggable, zoomControl) => {
  // https://developers.google.com/maps/documentation/javascript/examples/control-disableUI
  const map = new google.maps.Map(node, {
    mapTypeId: 'terrain',
    disableDefaultUI: true,
    draggable: draggable || false, 
    zoomControl: zoomControl || false, 
    scrollwheel: false, 
    disableDoubleClickZoom: true,
    clickableIcons: false
  });
  const bounds = new google.maps.LatLngBounds();

  runs.forEach((run, i) => {
    if(!run) return;
    // https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
    const coordinates = run.checkpoints.reduce((arr, c) => {
      return [...arr, {
        lat: c.lat,
        lng: c.lon
      }];
    }, []);

    // http://stackoverflow.com/questions/15719951/google-maps-api-v3-auto-center-map-with-multiple-markers
    coordinates.forEach((coord) => {
      bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
    });

    const path = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: runColors[i % runColors.length],
      strokeOpacity: 1.0,
      strokeWeight: 2,
      clickable: false
    });

    path.setMap(map);
  });

  map.fitBounds(bounds);
};