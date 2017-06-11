const express = require('express');
const router = express.Router();
const {
  loggedIn,
} = require('../util');
const {
  PAGE_META,
  APP_ROUTES,
} = require('../constants');

module.exports = (schemas) => {
  const { User } = schemas;

  router.get('/', (req, res) => {
    if(loggedIn(req)) {
      return res.status(200).sendFile(path.resolve(__dirname, './www/index.html'), {}, (err) => {
        if(err) return next(err);
      });
    }
    res.render('home', PAGE_META.home);
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