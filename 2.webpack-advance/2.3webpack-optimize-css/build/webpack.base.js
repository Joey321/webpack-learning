// webpack默认配置文件 遵循CommonJS规范

// 存放webpack公共配置

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

// css优化
// 1.将css抽取到独立文件中 开发/上线阶段都会用到
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // 入口
  entry: './src/main.js',
  // 出口，指定绝对路径/输出文件名称
  output: {
    path: path.join(__dirname, '..', './dist'),
    filename: '[name].js'
  },
  // plugin
  plugins: [
    // 在内存中/打包构建时生成一份模板html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    // 清理输出目录dist
    new CleanWebpackPlugin(),
    // 拷贝静态资源到dist目录，不会进行打包
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(__dirname, 'assets'),
    //     to: 'assets'
    //   }
    // ])
    // 在每个模块中自动注入jquery命名的变量$/jQuery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // 将css抽取到独立文件中；同时loader规则配置需要替换style-loader
    new MiniCssExtractPlugin({
      // filename: 'main.css'
      // placeholder语法 name跟随打包entry名
      filename: '[name].css'
    })
  ],
  // loader
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        // 2.自动添加css前缀 需要在'css-loader'右边添加'postcss-loader'；同时还需进行postcss配置 这里采用配置文件(postcss.config.js)的方式
        // 自动加前缀貌似未生效，待验证
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'less-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(jpg|jpeg|png|bmp|gif)$/,
        use: {
          // url-loader包装了file-loader
          loader: 'url-loader',
          options: {
            // 图片小于5kB则转换为base64格式
            limit: 5 * 1024,
            outputPath: 'images',
            name: '[name]-[hash:4].[ext]'
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
          // 已抽离到.babelrc
          // options: {
          //   presets: ['@babel/env'],
          //   plugins: [
          //     '@babel/plugin-proposal-class-properties',
          //     '@babel/plugin-transform-runtime'
          //   ]
          // }
        },
        exclude: /node_modules/
      },
      // 打包处理html中引用的图片资源(替换copy-webpack-plugin插件)
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      // 使用expose-loader将$挂载到全局作用域window下
      {
        // 解析jquery的绝对路径
        test: require.resolve('jquery'),
        use: {
          loader: 'expose-loader',
          options: '$'
        }
      }
    ]
  }
}