var path = require('path');
var webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = function (env) {
  // console.log('ENV ********************', env.URL)
  return {
    entry: {
      app: path.resolve(__dirname, './client/index.js')
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }, {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                disable: true
              }
            }
          ]
        }, {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { URL: JSON.stringify(env.URL) } }),
      new CompressionPlugin(),
      new BrotliPlugin()
    ],
    mode: 'production',//'development',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './public/dist')
    }
  }
}