import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import style from './styles/style.scss';
import App from './components/App';

injectTapEventPlugin();

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);