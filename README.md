# Runstoppable
Source code for the Runstoppable website

## Installation

Make sure that <a href="https://nodejs.org/en/">node.js</a> is installed, and that `node` and `npm` are available as commands.

Install dependencies by running `npm i` within the root directory of the repo.

## Building

If you haven't already, install <a href="https://webpack.js.org/">webpack</a> globally by running `npm i webpack -g`.

To make a build, `cd` to the root directory of the repo and run `webpack`.

To make a production build, with minified output, run `webpack -p`.

To continuously watch files for changes and auto build, run `webpack --watch`.

## Running the App

Webpack will output builds to `www/`. All you need to do is open `www/index.html` in your browser.
