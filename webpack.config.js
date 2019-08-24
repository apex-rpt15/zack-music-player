var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
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

            //   loader: ExtractTextPlugin.extract(
            //     'style-loader',
            //     combineLoaders([
            //       {
            //         loader: 'css-loader',
            //         query: {
            //           modules: true,
            //           localIdentName: '[name]__[local]___[hash:base64:5]'
            //         }
            //       }
            //     ])
            // )
          }
        ]
      }
    ]
  },
  // plugins: [
    // new webpack.EnvironmentPlugin(['URL'])
    // new webpack.DefinePlugin({ 'process.env.URL': JSON.stringify(process.env.URL) })
  // ],
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/dist')
  }
}