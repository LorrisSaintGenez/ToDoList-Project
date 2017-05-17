const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: resolve(__dirname, '../../src'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.jsx'
  ],
  output: {
    path: resolve(__dirname, '../../dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    sourceMapFilename: '[name].map'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    // enable HMR on the server
    contentBase: resolve(__dirname, 'dist'),
    // match the output path
    publicPath: '/'
    // match the output `publicPath`
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
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      chunksSortMode: 'dependency'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
};
