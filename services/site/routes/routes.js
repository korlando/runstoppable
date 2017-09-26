const express = require('express');
const path = require('path');

const {
  loggedIn,
} = require('../../../global/util');
const {
  PAGE_META,
  APP_ROUTES,
} = require('../../../global/constants');

const router = express.Router();
const APP_REGEX = new RegExp(`^\/(${APP_ROUTES.join('|')})(\/[a-z0-9\-_]+)*`, 'i');

module.exports = (schemas, production) => {
  const { User } = schemas;

  const loadApp = (req, res, next) => {
    const appFileName = production ? 'prod-index.html' : 'index.html';
    res.status(200)
    .sendFile(path.resolve(__dirname, '../../../www/' + appFileName), {}, (err) => {
      if(err) return next(err);
    });
  };

  router.get('/', (req, res, next) => {
    //if(loggedIn(req)) {
      return loadApp(req, res, next);
    //}
    res.render('home', PAGE_META.home);
  });

  router.get(APP_REGEX, (req, res, next) => {
    //if(loggedIn(req)) {
      return loadApp(req, res, next);
    //}
    res.redirect('/login?r=' + encodeURIComponent(req.path));
  });

  router.get('/:page', (req, res) => {
    const pageName = req.params.page.toLowerCase();
    if(PAGE_META[pageName]) {
      return res.render(pageName + '.pug', PAGE_META[pageName]);
    }
    res.status(404).render('404', PAGE_META['404']);
  });

  return router;
};