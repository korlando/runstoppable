import { combineReducers } from 'redux';
import sidebar from './sidebarReducers';
import run from './runReducers';
import modal from './modalReducers';

export default combineReducers({
  sidebar, run, modal
});