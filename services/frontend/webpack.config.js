const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname),
  },
  devServer: {
    static: {
      directory: __dirname,
    },
    port: 9000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    hot: true,
    client: {
      webSocketURL: {
        port: 443
      }
    }
  },
  mode: 'development'
};

/*
devServer: {
    static: {
      directory: __dirname,
    },
    compress: true,
    port: 9000,
  },
 */