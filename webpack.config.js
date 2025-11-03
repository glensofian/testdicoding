const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/views/main-view.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.html$/i, loader: 'html-loader', options: { minimize: false } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.webmanifest', to: '.' },
        { from: 'service-worker.js', to: '.' },
        { from: 'icons', to: 'icons' },
        { from: 'screenshots', to: 'screenshots' }
      ]
    })
  ],
  devServer: {
    static: { directory: path.join(__dirname) },
    port: 8080,
    hot: true
  }
};
