import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  //debug: true,
  devtool: 'inline-source-map',
  //noInfo: false,
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    // create HTML file that includes reference to bundled js.
    new HtmlWebpackPlugin( {
      template: 'src/index.html',
      inject: true
    })
  ],
  module: {
    rules: [
      {test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader']},
      {test: /\.css$/, use: 'css-loader'}
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}
