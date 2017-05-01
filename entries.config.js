const glob = require('glob');
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entryDir = './src/view/';
let finalDir = {};
const entries = {};
const plugins = [];

function partialDeal() {
  // home-index_member-index
  const configDir = process.env.npm_config_dir;

  if (!configDir) return false;
  const dirList = configDir.split('_');

  dirList.map(function (item) {
    let [dirName, fileName] = item.split('-');
    let finalDirVal = finalDir[dirName];

    if (finalDirVal) {
      finalDirVal.indexOf(fileName) == -1 && finalDirVal.push(fileName);
    } else {
      finalDir[dirName] = fileName ? [fileName] : undefined;
    }
  });

  return finalDir;
}

// 读取打包 module.json 路径
function readModule() {
  const pathList = glob.sync('./src/view/**/module.json');

  pathList.map(item => {
    const data = JSON.parse(fs.readFileSync(item, 'utf8'));

    if (data) {
      if (!_.isEmpty(finalDir)) {
        (data.directory in finalDir) && combineEntry(data);
      } else {
        combineEntry(data);
      }
    }
  });
}

function combineEntry(data) {
  const fileNameList = finalDir[data.directory];
  Object.keys(data.entries).map(item => {
    if (fileNameList) {
      fileNameList.indexOf(item) > -1 && combineOption(item, data);
    } else {
      combineOption(item, data)
    }
  });
}

function combineOption(item, data) {
  const options = data.entries[item];
  if (options) {
    options.template = entryDir + options.template;
    options.filename = 'html/' + options.filename;
    let temp = {};
    entries['js/' + data.directory + '/' + item] = entryDir + options.entry;
    delete options.entry;

    plugins.push(new HtmlWebpackPlugin(options));
  }
}

finalDir = partialDeal();

readModule();

module.exports = {
  entries,
  plugins
};