const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    static: {
      directory: __dirname,
    },
    compress: true,
    port: 9000,
  },
  mode: 'development'
};
