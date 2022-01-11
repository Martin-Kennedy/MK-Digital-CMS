const path = require('path');


module.exports = {
  mode: "development",
  entry: './src/fe/app.js',
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
      }
  ]
  },
  resolve: {
    fallback: { "path": require.resolve("path-browserify") }
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true
  }
};
