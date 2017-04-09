import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Dashboard from '../components/Dashboard';
import App from '../components/App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard}></IndexRoute>
  </Route>
);