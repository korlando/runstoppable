# Runstoppable
Source code for the Runstoppable website

## Installation

Make sure that <a href="https://nodejs.org/en/">node.js</a> is installed, and that `node` and `npm` are available as commands.

```sh
$ git clone https://github.com/korlando/runstoppable runstoppable
$ cd runstoppable
$ npm i
```

## Building

If you haven't already, install <a href="https://webpack.js.org/">webpack</a> globally by running `npm i webpack -g`.

To make a build, `cd` to the root directory of the repo and run `webpack`.

To make a production build, with minified output, run `webpack -p`.

To continuously watch files for changes and auto build, run `webpack --watch`.

## Running the Server

Use `node server.js` to start the server on port 3000. Options:

```text
-p, --port <port>
    Run the server on the specified port.

--production
    Run the server in production mode; disables the logger.
```
