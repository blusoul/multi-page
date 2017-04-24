const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
let {
  entries,
  plugins
} = require('./entries.config');

module.exports = {
  cache: true,
  entry: entries,
  output: {
    path: __dirname + '/output/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.pug$/,
      loader: 'pug-loader'
    }, ]
  },
  watch: true,
  plugins: plugins
};