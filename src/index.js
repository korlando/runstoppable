import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/flexbox.scss';
import './styles/sidebar.scss';
import './styles/modal.scss';
import './styles/style.scss';
import App from './components/App';

injectTapEventPlugin();

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);