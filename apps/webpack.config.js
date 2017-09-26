const argv = require('minimist')(process.argv.slice(2));
const production = Boolean(argv.p);

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: production ? 'prod-index.html' : 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
  },
});

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../www'),
    filename: production ? 'js/[name].[hash].js' : 'js/[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, './src')
    }, {
      test: /\.css$/,
      use: ['style-loader', {loader: 'css-loader', options: {url: false}}],
      include: [path.resolve(__dirname, './src/styles')]
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, './src/styles')
    }, {
      test: /\.json$/,
      loader: 'json-loader',
      include: path.resolve(__dirname, './src/data')
    }],
  },
  plugins: [htmlConfig]
};