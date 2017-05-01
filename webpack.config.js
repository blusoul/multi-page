const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let {
  entries,
  plugins
} = require('./entries.config');

entries['js/common/index'] = './src/public/js/index';

plugins.push(new ExtractTextPlugin({
    filename: (getPath) => {
      return getPath('css/[name]-[contenthash:6].css').replace('css/js', 'css');
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
);
module.exports = {
  cache: true,
  entry: entries,
  output: {
    path: __dirname + '/output/',
    // error: webpack-dev-server cannot use [chunkhash]
    // filename: '[name]-[chunkhash:6].js'  
    filename: '[name]-[hash:6].js'
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
        test: /\.styl|\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
      }
    ]
  },
  watch: true,
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, 'output'),
    compress: true,
    hot: true,
    port: 9000
  }
};