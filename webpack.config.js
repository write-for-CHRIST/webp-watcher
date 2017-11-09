/* global __dirname, require, module*/
const fs = require('fs');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'pic-piper';

let plugins = [],
  outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  // plugins.push(new DashboardPlugin());
  outputFile = libraryName + '.js';
}

// Hack for .bin
const nodeModules = { sharp: 'commonjs sharp' };

fs
  .readdirSync('node_modules')
  .filter(item => ['.bin'].indexOf(item) === -1) // exclude the .bin folder
  .forEach(mod => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins,
  target: 'node',
  node: {
    fs: true
  },
  externals: nodeModules
};

module.exports = config;
