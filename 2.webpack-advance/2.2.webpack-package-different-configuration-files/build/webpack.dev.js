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
    compress: true,
    // 方式一：简写形式
    // proxy: {
    //   // 前端访问'/api'时会转发到地址http://localhost:9999/api
    //   '/api': 'http://localhost:9999'

    // }
    // 方式二：配置为对象形式
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        // pathRewrite的配置表示代理转发请求时，请求地址按照规则重写地址某部分。比如这里是不会携带'/api'
        // 比如前端请求的是'http://localhost:9999/api/getUserInfo'，请求地址'/api/getUserInfo'带'/api'；但是后端现在要求不带'/api'，配置的是'/getUserInfo'，路径只需要一级
        // 此时proxy配置pathRewrite，代理转发到后端请求时就不会携带'/api'，从而请求成功
        pathRewrite: {
          '^/api': ''
        }
      }
    }
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