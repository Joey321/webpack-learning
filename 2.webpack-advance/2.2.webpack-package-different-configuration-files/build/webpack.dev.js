const webpack = require('webpack')

const merge = require('webpack-merge')

const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    // contentBase: './src',
    open: true,
    port: 3300,
    hot: true,
    compress: true
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境变量
      // 会将值作为表达式进行解析
      IS_DEV: 'true'
    })
  ]
})