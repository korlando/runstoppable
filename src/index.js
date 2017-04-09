import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { Router, browserHistory } from 'react-router';
import routes from './routes/routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('app')
);