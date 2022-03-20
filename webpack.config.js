const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = {
  mode: "development",
  entry: './src/fe/app.js',
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
