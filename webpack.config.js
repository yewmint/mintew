const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

let common = {
  devtool: '#source-map',
  target: 'electron',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'image/[name].[ext]'
        }
      },
      {
        test: /\.ttf$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]'
        }
      },
      {
        test: /\.frag$|\.vert$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  }
}

module.exports = [
  {
    ...common,
    entry: {
      'mintew': './src/index.js',
      'window': './src/window.js'
    },
    output: {
      path: resolve('dist'),
      filename: '[name].js',
    },
  }
]
