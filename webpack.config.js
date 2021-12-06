const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/fe/store/storeTest.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
  ]
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true
  }
};
