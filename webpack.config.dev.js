import path from 'path';

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
  plugins: [],
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
