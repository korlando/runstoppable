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
const config = {
  modeBarButtonsToRemove: ['sendDataToCloud', 'zoom2d', 'pan2d', 
  'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'toggleSpikelines',
  'hoverClosestCartesian', 'hoverCompareCartesian'],
  displaylogo: false, 
  displayModeBar: true,
  showTips: false
}

export const renderNewPlot = (node, data, layout) => {
  Plotly.newPlot(node, data, layout, config);
};

export const renderRunPath = (node, run) => {
  // https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
  const coordinates = run.checkpoints.reduce((arr, c) => {
    return [...arr, {
      lat: c.lat,
      lng: c.lon
    }];
  }, []);
  // https://developers.google.com/maps/documentation/javascript/examples/control-disableUI
  const map = new google.maps.Map(node, {
    mapTypeId: 'terrain',
    disableDefaultUI: true,
    draggable: false, 
    zoomControl: false, 
    scrollwheel: false, 
    disableDoubleClickZoom: true,
    clickableIcons: false
  });
  // http://stackoverflow.com/questions/15719951/google-maps-api-v3-auto-center-map-with-multiple-markers
  const bounds = new google.maps.LatLngBounds();
  coordinates.forEach((coord) => {
    bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
  });

  map.fitBounds(bounds);

  const path = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    clickable: false
  });

  path.setMap(map);
};