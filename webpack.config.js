const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: './src/app.js',
  target: 'web',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      
  ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      systemvars: true,
    }),
  ],
  
  resolve: {
    fallback: { "path": false }
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
  }
};
