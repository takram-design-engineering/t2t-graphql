// MIT License
// Copyright (C) 2020-Present Shota Matsuda

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const dotenv = require('dotenv')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

dotenv.config()

const webConfig = (env, argv) => ({
  mode: env.production ? 'production' : 'development',
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, 'src/index.jsx')]
  },
  output: {
    path: path.resolve(__dirname, env.production ? 'dist' : 'dest'),
    filename: '[name].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devtool: !env.production ? 'source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 5000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: ExtractCssChunksPlugin.loader,
            options: {
              hmr: !env.production,
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !env.production,
              modules: {
                localIdentName: env.production
                  ? '[hash:base64:5]'
                  : '[path][name]__[local]--[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !env.production
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !env.production
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'public' }]),
    new ExtractCssChunksPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      hot: true
    }),
    ...(env.production
      ? [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
      ]
      : [new webpack.HotModuleReplacementPlugin()])
  ]
})

module.exports = [webConfig]
