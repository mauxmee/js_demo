import path from 'path';
// import webpack from 'webpack';
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

export default {
  //debug: true,
  devtool: 'source-map',
  //noInfo: false,
  mode: 'development',
  // entry: [
  //   path.resolve(__dirname, 'src/index')
  // ],
  // bundle split : 3rd library into a separate bundle
  // so that no need to download again
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },

  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    //filename: 'bundle.js'
    filename: '[name].[chunkhash].js'
  },
  // optimization
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       vendors: false,
  //       // vendor chunk
  //       vendor: {
  //         // sync + async chunks
  //         chunks: 'all',
  //         // import file path containing node_modules
  //         test: /node_modules/
  //       }
  //     }
  //   }
  // },
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 0
    // },
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  plugins: [

    // Generate an external css file with a hash in the filename
    //new ExtractTextPlugin('[name].[contenthash].css'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Elinimate duplicated packages when generating bundle
    //new webpack.optimize.DedupePlugin(), <--- removed from webpack already
    // minify JS
    // new UglifyJsPlugin({
    //   sourceMap: true, // need to enable sourceMap here
    //   cache: true,
    //   parallel: true,
    //   uglifyOptions: {
    //     warnings: false,
    //     ie8: false,
    //     output: {
    //       comments: false
    //     }
    //   }
    // }),

    // // Use CommonsChunkPlugin to create a separate bundle
    // // of vendor libraries so that they're cached separately.
    // new webpack.optimize.splitChunks({
    //   name: 'vendor'
    // }),

    // create HTML file that includes reference to bundled js.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      //{ test: /\.css$/, use: 'css-loader' }
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
      //{ test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}
