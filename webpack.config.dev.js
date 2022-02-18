const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,'build'),
    filename: 'bundle.js',
    hashFunction: "xxhash64",
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node__modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpeg|gif|svg|jpg)$/i,
        type: 'asset'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new Dotenv(),
     
    
  ],
  devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 3006,
		open: true,
	}
}