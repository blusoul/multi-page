let webpack = require('webpack')
let path = require('path');
let fs = require('fs');
let glob = require('glob');
let _ = require('lodash');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {
  entries,
  plugins
} = require('./entries.config');

// 输出目录
const outputDir = './output/'

// 
const entryDir = './src/view/'

var config = {
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


module.exports = config;