import moment from 'moment';
import * as sidebarActions from './actions/sidebarActions';
import * as modalActions from './actions/modalActions';
import * as runActions from './actions/runActions';
import * as menuActions from './actions/menuActions';
import store from './store/store';
import runColors from './constants/runColors';

const toggleEvent = new Event("sidebar");

export const toggleSidebar = () => {
  setTimeout(function(){window.dispatchEvent(toggleEvent); }, 300);
  store.dispatch(sidebarActions.toggleSidebar());
};

export const setModal = (modalType) => {
  store.dispatch(modalActions.setModal(modalType));
}

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

const getAdjustedBounds = (run, node) => {
  const { centroid, bounds } = run;
  const { x, y } = centroid;
  const latMag = Math.abs(bounds.north - y);
  const lonMag = Math.abs(bounds.east - x);
  
  const latScale = Math.log(node.clientHeight) * (0.5 + latMag) / 4;
  const lonScale = Math.log(node.clientWidth) * (0.5 + lonMag) / 4;
  return {
    north: y + latScale * latMag,
    south: y - latScale * latMag,
    east: x + lonScale * lonMag,
    west: x - lonScale * lonMag
  };
};

export const renderRunPath = (node, runs, draggable, zoomControl, resetButton) => {
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
    const adjustedBounds = getAdjustedBounds(run, node);
    bounds.extend(new google.maps.LatLng(adjustedBounds.north, adjustedBounds.west));
    bounds.extend(new google.maps.LatLng(adjustedBounds.south, adjustedBounds.east));

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
  
  if (resetButton){
    google.maps.event.addListenerOnce(map, "idle", function(){
      resetButton.style.opacity = 1;
    });
    resetButton.addEventListener("click", function(){
      map.fitBounds(bounds);
    });
  }
};

const JSON_DATE_REGEX = /^\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2}$/;

export const parseRun = (run) => {
  // TODO: update dummy location for GR5
  const parsedRun = {
    location: 'Cambridge, MA',
    checkpoints: []
  };

  // parse the run start date
  if(run.date && run.date.match(JSON_DATE_REGEX)) {
    parsedRun.start = moment(run.date, 'YYYY_MM_DD_HH_mm_ss');
  }
  
  const plsSmooth = ["pace", "heartRate", "elevation"];
  const sVal = {
    "pace": {
      "prevValue": null,
      "threshold": 6,
      "unreal": 0,
    },
    "heartRate": {
      "prevValue": null,
      "threshold": 5,
      "unreal": 5,
    },
    "elevation": {
      "prevValue": null,
      "threshold": 4,
      "unreal": -100000,
    }
  };
  const bounds = {
    north: -Infinity,
    south: Infinity,
    east: -Infinity,
    west: Infinity
  };

  run.checkpoints.forEach((checkpoint, i) => {
    // skip over units object @ index 0
    // skip every other checkpoint
    if(i % 2 === 0) return;

    // update bounding box
    const { lat, lon } = checkpoint;
    if(lat !== undefined &&
       lon !== undefined) {
      bounds.north = Math.max(bounds.north, Number(lat));
      bounds.south = Math.min(bounds.south, Number(lat));
      bounds.east = Math.max(bounds.east, Number(lon));
      bounds.west = Math.min(bounds.west, Number(lon));
    }

    const parsedCheckpoint = {};
    Object.keys(checkpoint).forEach((cKey) => {
      var keyValue = Number.parseFloat(checkpoint[cKey]);
      if (plsSmooth.includes(cKey)) {
        if (sVal[cKey].prevValue == null) {
          sVal[cKey].prevValue = keyValue;
        }
        const delta = Math.abs(keyValue - sVal[cKey].prevValue);
        if (keyValue < sVal[cKey].unreal || delta > sVal[cKey].threshold) {
          parsedCheckpoint[cKey] = null;
        }
        else {
          sVal[cKey].prevValue = keyValue;
          parsedCheckpoint[cKey] = keyValue;
        }
      } else {
        parsedCheckpoint[cKey] = keyValue;
      }
    });
    
    parsedRun.checkpoints.push(parsedCheckpoint);
  });

  parsedRun.bounds = bounds;
  parsedRun.centroid = {
    x: (bounds.east + bounds.west) / 2,
    y: (bounds.north + bounds.south) / 2
  };;

  return parsedRun;
};