const webpack = require('webpack')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://paralleltext.ndk89.live/'),
    })
  ],
  devtool: 'source-map'
});