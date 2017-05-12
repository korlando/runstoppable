import moment from 'moment';
import crypto from 'crypto';
import * as sidebarActions from './actions/sidebarActions';
import * as modalActions from './actions/modalActions';
import * as runActions from './actions/runActions';
import * as menuActions from './actions/menuActions';
import * as userActions from './actions/userActions';
import store from './store/store';
import runColors from './constants/runColors';
import runData from './data/runData';
import lf from './lf';

const toggleEvent = new Event("sidebar");

export const toggleSidebar = () => {
  setTimeout(function() {
    window.dispatchEvent(toggleEvent);
  }, 300);
  store.dispatch(sidebarActions.toggleSidebar());
};

export const setModal = (modalType) => {
  store.dispatch(modalActions.setModal(modalType));
}

export const toggleModal = (modalType, data) => {
  store.dispatch(modalActions.toggleModal(modalType, data));
};

export const openModal = (modalType, data) => {
  store.dispatch(modalActions.openModal(modalType, data));
};

export const editProfile = (changes) => {
  store.dispatch(userActions.editProfile(changes));
};

export const dispatchAddBulkRuns = (runs) => {
  store.dispatch(runActions.addBulkRuns(runs));
};

export const editAllRunsSort = (sort) => {
  store.dispatch(runActions.editAllRunsSort(sort));
};

export const dispatchEditRun = (changes, runId) => {
  store.dispatch(runActions.editRun(changes, runId));
};

export const dispatchDeleteRun = (runId) => {
  store.dispatch(runActions.deleteRun(runId));
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
  modeBarButtonsToRemove: [
    'sendDataToCloud',
    'zoom2d',
    'pan2d', 
    'zoomIn2d',
    'zoomOut2d',
    'toggleSpikelines',
    'hoverClosestCartesian',
    'hoverCompareCartesian',
    'autoScale2d',
    'lasso2d',
    'select2d'
  ],
  displaylogo: false, 
  displayModeBar: true,
  showTips: false
};

export const renderNewPlot = (node, data, layout) => {
  Plotly.newPlot(node, data, layout, config);
};

export const setTraceVisibility = (chart, traceId, visible) => {
  Plotly.restyle(chart, { visible: visible }, traceId);
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

export const renderRunPath = (node, runs, draggable, zoomControl, scrollwheel, resetButton) => {
  // https://developers.google.com/maps/documentation/javascript/examples/control-disableUI
  const map = new google.maps.Map(node, {
    mapTypeId: 'terrain',
    disableDefaultUI: true,
    draggable: draggable || false, 
    zoomControl: zoomControl || false, 
    scrollwheel: scrollwheel || false, 
    disableDoubleClickZoom: true,
    clickableIcons: false
  });
  const bounds = new google.maps.LatLngBounds();

  runs.forEach((run, i) => {
    if(!run) return;
    // https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
    const coordinates = run.checkpoints.reduce((arr, c) => {
      // skip bad GPS coordinates
      if(c.lat === 0 && c.lon === 0) return arr;
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
    parsedRun.start = moment(run.date, 'YYYY_MM_DD_HH_mm_ss').toDate();
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
    const { lat, lon } = checkpoint;

    // update bounding box
    if(lat !== undefined &&
       lon !== undefined &&
       lat !== '0' &&
       lon !== '0') {
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

/** returns array of run ids that should be filtered out.
    definitely not as efficient as it could be. */
export const filterRuns = (runs, query) => {
  const strippedQuery = query.replace(/[.,]/g, "");
  const queryWords = strippedQuery.toLowerCase().split(" ");
  return runs.reduce((arr, run) => {
    const lowMoment = run.start.format("dddd, MMMM Do YYYY, h:mm:ss a").toLowerCase();
    const searchStrings = [lowMoment, run.location.toLowerCase(), run.name.toLowerCase()];
    if (query !== ""){
      for (let i=0; i<queryWords.length; i++){
        let termWorks = false;
        for (let j=0; j<searchStrings.length; j++){
          const searchString = searchStrings[j];
          const words = searchString.split(" ");
          for (let k=0; k<words.length; k++){
            if (words[k].startsWith(queryWords[i])){
              termWorks = true;
            }
          }
        }
        if (!termWorks){
          return arr.concat([run.id]);
        }
      }
    }
    return arr;
  }, []);
}

export const roundTo = (num, decimals) => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};

export const isBadStat = (stat) => {
  return stat === null || Number.isNaN(stat);
};

export const encryptPassword = (password) => {
  let bytes;
  try {
    bytes = crypto.randomBytes(64);
  } catch(e) {
    // use pseudo random if needed
    bytes = crypto.pseudoRandomBytes(64);
  }

  const salt = bytes.toString('hex');
  const hash = crypto
               .createHash('sha512')
               .update(password + salt)
               .digest('hex');
  return `${hash}/${salt}`;
};

export const verifyPass = (encrypted, tryPass) => {
  const passArray = encrypted.split('/');
  const hash = passArray[0];
  const salt = passArray[1];
  const tryHash = crypto
                  .createHash('sha512')
                  .update(tryPass + salt)
                  .digest('hex');
  return hash === tryHash;
};

export const generateId = () => {
  let id;
  try {
    id = crypto.randomBytes(10).toString('hex');
  } catch(e) {
    id = crypto.pseudoRandomBytes(10).toString('hex');
  }
  return id;
};

export const makeFakeDatabase = () => {
  const db = { users: [] };
  const fakeUser = {
    id: generateId(),
    username: 'ron',
    name: 'Ron Stoppable',
    email: 'ron@stoppable.com',
    password: '7ac42f3e0c92af8d4ca0a9ddd4a2877ac39d6b11742c67212773d8ec0ea4e79c50cc790a7b0c27a4106aa8de0bf97fc9bed20ebbe5bb6f0097255c10d91f33ed/c0a4b2f9346e97a8f821690083d5a7cf2b367274575679587d1f4516c906580ed3bcebaeba58185972b8edea88aa821d1d7183d5b078799b9c24fe41e0153138',
    photo: 'images/default-ron.jpg',
    shoes: [],
    heightFt: 5,
    heightIn: 6,
    weight: 140,
    units: 'metric',
    timezone: 'America/New_York'
  };
  
  const usedIds = [];
  const runs = [];
  Object.keys(runData).forEach((key, i) => {
    const run = parseRun(runData[key]);
    let id = generateId();
    // ensure id is unique
    while(usedIds.includes(id)) {
      id = generateId();
    }
    run.id = id;
    run.name = `Run ${i}`;
    runs.push(run);
    usedIds.push(id);
  });
  
  fakeUser.runs = runs;
  db.users.push(fakeUser);

  return db;
};

export const loginUser = (userDoc) => {
  dispatchAddBulkRuns(userDoc.runs);
  delete userDoc.runs;
  editProfile(Object.assign({ loggedIn: true }, userDoc));
};

export const logoutUser = () => {
  lf.removeItem('uid')
  .then(() => {
    editProfile({ loggedIn: false });
  }).catch((err) => {

  });
};

export const fetchDB = () => {
  return lf.getItem('db');
};

export const updateDB = (db) => {
  return lf.setItem('db', db);
};

export const findUserById = (db, uid) => {
  return db.users.find(u => u.id === uid);
};

export const updateRunName = (name, run, USER_ID, callback) => {
  fetchDB().then((db) => {
    if(db) {
      const user = findUserById(db, USER_ID);
      if(user) {
        const rid = run.id;
        const runDoc = user.runs.find(r => r.id === rid);
        if(runDoc) {
          runDoc.name = name;
        }
        updateDB(db).then(() => {
          dispatchEditRun({ name }, rid);
          if(callback) {
            callback();
          }
        }).catch((err) => {

        });
      }
    }
  }).catch((err) => {

  });
};

export const convertUnits = (units) => {
  switch(units) {
    case 'km/h':
      return 'miles/h';
    case 'm':
      return 'ft';
    case 'km':
      return 'miles';
    default:
      return units;
  }
};
