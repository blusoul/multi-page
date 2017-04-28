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
    filename: '[name]-[chunkhash:5].js'
  },
  module: {
    rules: [{
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  watch: true,
  plugins: plugins
};