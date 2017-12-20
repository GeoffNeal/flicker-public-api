const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: './src/index',

  output: {
    path: path.join(__dirname, 'dist/scripts'),
    filename: 'dist.bundle.js',
    publicPath: '/dist/scripts/'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src/styles')],
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  }
};
