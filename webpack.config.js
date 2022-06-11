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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      
  ]
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  
  resolve: {
    fallback: { "path": require.resolve("path-browserify") }
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true
  }
};
