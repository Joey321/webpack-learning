const webpack = require('webpack')

const merge = require('webpack-merge')

const baseConfig = require('./webpack.base')

const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境变量
      // 会将值作为表达式进行解析
      IS_DEV: 'false'
    })
  ],
  // 3.优化配置(会覆盖webpack默认配置)
  optimization: {
    minimizer: [
      // 开启js压缩(替代了'uglifyjs-webpack-plugin')
      new TerserJSPlugin({}),
      // 开启css压缩
      new OptimizeCSSAssertsPlugin({})
    ]
  }
})