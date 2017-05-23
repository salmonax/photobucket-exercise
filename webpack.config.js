const path = require('path');

const config = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'stage-2'],
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx'],
  }
};


module.exports = config;