const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const envStr = process.env.NODE_ENV === 'production' ? 'prd' : 'dev';
console.log(process.env, envStr, 1111111111111111111111111111111111111111111)
module.exports = {
  entry: {
    vendor: ['whatwg-fetch'],
    common: ['./src/public/js/common/index']
  },
  output: {
    path: path.join(__dirname, '/output/js/common/'),
    filename: '[name]_[chunkhash:7].js',
    library: '[name]_[chunkhash:7]',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader'
    }],
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, 'bundle-${envStr}-manifest.json'),
      name: '[name]_[chunkhash:7]'
    }),
    new AssetsPlugin({
      filename: 'bundle-${envStr}-config.json',
      path: __dirname
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}