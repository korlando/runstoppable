import { combineReducers } from 'redux';
import sidebar from './sidebarReducers';
import run from './runReducers';

export default combineReducers({
  sidebar, run
});