// dynamic Node.js server

const cluster = require('cluster');

// fork child processes
if(cluster.isMaster) {
  cluster.fork();
  cluster.on('exit', (worker, code, signal) => {
    if(signal) {
      console.log(`Worker ${worker.id} killed by signal: ${signal}`);
    } else if(code !== 0) {
      console.log(`Worker ${worker.id} exited with error code: ${code}`);
    }
    cluster.fork();
  });
  return;
}

process.on('uncaughtException', (err) => {
  console.log(`uncaughtException: ${err}\n${err.stack}`);
  process.exit(1);
});

// check environment variables
if(process.env.RS_MLAB_SANDBOX === undefined) {
  throw new Error('RS_MLAB_SANDBOX is a required environment variable');
}
if(process.env.RS_SESSION_SECRET === undefined) {
  throw new Error('RS_SESSION_SECRET is a required environment variable');
}

const {
  DEFAULT_PORT,
  REDIS_PORT,
} = require('./constants');

const http = require('http');
const path = require('path');

const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// get port option, default to port 3000 if not specified
const argv = require('minimist')(process.argv.slice(2));
const port = Number(argv.p) || Number(argv.port) || DEFAULT_PORT;
const production = Boolean(argv.production || process.env.NODE_ENV === 'production');

// mongoose config
const mongooseConn = mongoose.createConnection(process.env.RS_MLAB_SANDBOX);
const schemas = {
  User: require('./models/User')(mongooseConn),
};

const app = express();
app.set('port', port);

if(!production) {
  app.use(logger('dev'));
}

// public directory settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'www'), {
  index: '',
}));

// view engine
app.set('views', './views');
app.set('view engine', 'pug');

// sessions
const sessionMiddleware = session({
  secret: process.env.RS_SESSION_SECRET,
  name: 'Cz9SLkpdycaCp0FKichQ',
  cookie: {
    maxAge: 7 * 24 * 3600 * 1000,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ port: REDIS_PORT }),
});
app.use(sessionMiddleware);

// routing
app.use('/', require('./routes/routes')(schemas));

// create server
const server = http.createServer(app);
server.listen(port);
server.on('error', (err) => {
  if(err.syscall !== 'listen') {
    throw err;
  }

  const bind = `Port ${port}`;

  switch (err.code) {
  case 'EACCES':
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw err;
  }
});
server.on('listening', () => {
  console.log(`Server listening on port ${port}`)
});
