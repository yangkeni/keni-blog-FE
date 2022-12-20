const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**@type {import('webpack').Configuration} */

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          unused: true,
          drop_console: true,
          drop_debugger: true,
          dead_code: true
        }
      }
    })]
  },
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              require.resolve('@babel/preset-react'),
              [require.resolve('@babel/preset-env', { module: false })],
            ],
          },
        },
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin() // 开启则分析数据包大小
  ],
  devServer: {
    hot: true,
    port: 3001,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
  },
};
