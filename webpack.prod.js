const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  entry: { chessboard: './src/Chessboard/export.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: 'chessboardjsx',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: false,
        keep_classnames: true
      }
    })
    // new BundleAnalyzerPlugin()
  ],
  externals: { react: 'react', 'react-dom': 'react-dom' }
});
