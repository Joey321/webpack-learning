const webpack = require('webpack')

const merge = require('webpack-merge')

const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境变量
      // 会将值作为表达式进行解析
      IS_DEV: 'false'
    })
  ]
})