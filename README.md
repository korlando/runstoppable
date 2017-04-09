# Runstoppable
Source code for the Runstoppable website

## Installation

Make sure that <a href="https://nodejs.org/en/">node.js</a> and <a href="https://www.npmjs.com/">npm</a> are installed, and that `node` and `npm` are available as commands.

Install dependencies by running `npm i` within the root directory of the repo.

## Building

If you haven't already, install <a href="https://webpack.js.org/">webpack</a> globally by running `npm i webpack -g`.

To make a build, `cd` to the root directory of the repo and run `webpack`.

To make a production build, with minified output, run `webpack -p`.

To continuously watch files for changes and auto build, run `webpack --watch`.

## Running the App

This source code comes with a simple http server to get the application files. From the root directory, run `npm start` to run the server on port 3000. For a specific port, such as port 8080, run `node server.js -p 8080`. The `-p` flag specifies the port number.

Use `--production` to disable logging messages to the console.

Finally, visit `localhost:3000` in your browser. All routes will load the same file located at `www/index.html`.
