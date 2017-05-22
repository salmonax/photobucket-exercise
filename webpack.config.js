const path = require('path');

const config = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx']
  }
};


module.exports = config;