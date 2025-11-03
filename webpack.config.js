const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/views/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'manifest.webmanifest', to: '.' },
        { from: 'service-worker.js', to: '.' },
        { from: 'icons', to: 'icons' },
        { from: 'screenshots', to: 'screenshots' },
      ],
    }),
  ],
  devServer: {
    static: './dist',
    historyApiFallback: true,
  },
};
