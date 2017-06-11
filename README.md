# Runstoppable
Source code for the Runstoppable website

## Setting up your environment

Make sure that <a href="https://nodejs.org/en/">Node.js</a> is installed, and that `node` and `npm` are available as commands.

```sh
$ git clone https://github.com/korlando/runstoppable runstoppable
$ cd runstoppable
$ npm i
```

The following environment variables are required for the Node server to run:

```text
RS_MLAB_SANDBOX
RS_SESSION_SECRET
```

You will also need to run <a href="https://redis.io/">Redis</a> on the default port, 6379. We use Redis to store Express sessions.

## Building

If you haven't already, install <a href="https://webpack.js.org/">webpack</a> globally with `npm i webpack -g`.

To make a build, `cd` to the root directory of the repo and run `webpack`.

To make a production build, with minified output, run `webpack -p`.

To continuously watch files for changes and auto build, run `webpack --watch`.

## Running the server

Use `node server.js` to start the server on port 3000. Options:

```text
-p, --port <port>
    Run the server on the specified port.

--production
    Run the server in production mode; disables the logger.
```

You can also set `NODE_ENV=production` to enable production mode:

```sh
$ NODE_ENV=production node server.js
```

Use <a href="https://github.com/foreverjs/forever">forever</a> to run the server in the background, which can be installed with `npm i -g forever`. Include `--uid "runstoppable"` for assigning a process namespace (makes it easier to restart and stop).

```sh
$ forever start --uid "runstoppable" server.js
```

With options:

```sh
$ forever start --uid "runstoppable" server.js -p 8080 --production
```

Restart or stop the server:

```sh
$ forever restart runstoppable
$ forever stop runstoppable
```
