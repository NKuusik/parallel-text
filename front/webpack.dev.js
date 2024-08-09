const { merge } = require('webpack-merge');
const webpack = require('webpack')
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://127.0.0.1:8000/'),
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    watchFiles: ["./src/**"],
    hot: true
  },
});