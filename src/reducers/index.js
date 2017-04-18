import { combineReducers } from 'redux';
import sidebar from './sidebarReducers';
import run from './runReducers';
import modal from './modalReducers';
import menu from './menuReducers';

export default combineReducers({
  sidebar, run, modal, menu
});