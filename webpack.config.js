const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const Dotenv = require('dotenv-webpack');


module.exports = {
  mode: "development",
  entry: './src/app.js',
  target: 'web',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
      use: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      
  ]
  },
  plugins: [
    new NodePolyfillPlugin(),
    new Dotenv()
  ],
  
  resolve: {
    fallback: { "path": require.resolve("path-browserify") }
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true
  }
};
