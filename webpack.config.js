// separate webpack configuration
// for creating the /dist files

var webpack = require('webpack');
var path = require('path');
var libraryName = 'main';
var outputFile = libraryName + '.js';
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  target: 'node',
  externals: [nodeExternals()],
  entry: __dirname + '/src/javascripts/dist.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css!sass")
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve('./src/stylesheets'),
      path.resolve('./node_modules/normalize.css')
    ]
  },
  resolve: {
    root: path.resolve('./src/javascripts'),
    extensions: ['', '.js']
  },
  plugins: [
    new ExtractTextPlugin("main.css")
  ]
};

module.exports = config;