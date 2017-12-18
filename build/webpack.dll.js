const config = require('../config');
const webpack = require('webpack');
const path = require('path');
const ENV = process.env.NODE_ENV || 'production';
const base = ['vue', 'vue-router', 'vuex', 'axios'];

const entryName =  ENV === 'development' ? 'base_dev' : 'base';

module.exports = {
  entry: {
    [entryName]: base,
  },
  output: {
    path: path.resolve(__dirname, config.build.staticRoot, 'lib', 'dll'),
    filename: '[name].dll.js',
    library:'[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_library',
    }),
  ]
};
