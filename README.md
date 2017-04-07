# Runstoppable
Source code for the Runstoppable website

## Installation

Make sure that <a href="https://nodejs.org/en/">node.js</a> and <a href="https://www.npmjs.com/">npm</a> are installed.

Install dependencies by running `npm i` within the root directory of the repo.

## Building

If you haven't already, install <a href="https://webpack.js.org/">webpack</a> globally by running `npm i webpack -g`.

To make a build, `cd` to the root directory of the repo and run `webpack`.

To make a production build, with minified output, run `webpack -p`.

To continuously watch files for changes and auto build, run `webpack --watch`.
