// server-side constants

const DOMAIN = 'https://runstoppable.io'; // TODO: update this when a domain is bought
const APP_NAME = 'Runstoppable';

module.exports = {
  DOMAIN,
  DEFAULT_PORT: 4444,
  REDIS_PORT: 6379,
  UNITS_ENUM: [
    'metric',
    'imperial',
  ],
  PAGE_META: {
    'home': {
      title: APP_NAME,
      desc: '',
      url: DOMAIN,
    },
    '404': {
      title: '404 Not Found - ' + APP_NAME,
      desc: 'We were unable to find this page',
      url: DOMAIN + '/404',
    },
  },
  APP_ROUTES: [
    'runs',
    'starred',
    'trends',
    'settings',
  ],
};