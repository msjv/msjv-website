const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: [ 'app' ],
      template: path.resolve(__dirname, './src/index.pug'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.pug$/,
      use: [{
        loader: 'pug-loader'
      }]
    }]
  }
}
