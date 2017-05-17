const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  context: resolve(__dirname, '../../src'),
  entry: './index.jsx',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  output: {
    path: resolve(__dirname, '../../dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    sourceMapFilename: '[name].map'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          resolve(__dirname, '../../src')
        ],
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-1']
        }
      }
    ],
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mange: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
};
