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

const http = require('http');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// get port option, default to port 3000 if not specified
const argv = require('minimist')(process.argv.slice(2));
const port = Number(argv.p) || Number(argv.port) || 3000;
const production = Boolean(argv.production);

// mongoose config
const mongoEnvVar = 'RS_MLAB_SANDBOX';
if(process.env[mongoEnvVar] === undefined) {
  throw new Error(`${mongoEnvVar} is a required environment variable`);
}
const mongooseConn = mongoose.createConnection(process.env[mongoEnvVar]);
const schemas = {
  User: require('./models/User')(mongooseConn),
};

const app = express();
app.set('port', port);

if(!production) {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'www'), {
  index: 'index.html'
}));

// load index.html for all routes
const router = express.Router();
router.get('*', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, './www/index.html'), {}, (err) => {
    if(err) return next(err);
  })
});
app.use('/', router);

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
