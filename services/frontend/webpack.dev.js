 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devServer: {
    static: {
      directory: __dirname,
    },
    port: 9000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    hot: true,
  },
  devtool: 'inline-source-map'
 });
