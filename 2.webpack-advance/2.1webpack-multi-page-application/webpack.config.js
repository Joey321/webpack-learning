// webpack默认配置文件 遵循CommonJS规范

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // 入口
  // entry: './src/main.js',
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  // 出口，指定绝对路径/输出文件名称
  output: {
    path: path.join(__dirname, './dist'),
    // filename: 'bundle.js'
    filename: '[name].js'
  },
  mode: 'development',
  devServer: {
    // contentBase: './src',
    open: true,
    port: 3300,
    hot: true,
    compress: true
  },
  // plugin
  plugins: [
    // 在内存中/打包构建时生成一份模板html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'other.html',
      template: './src/other.html',
      chunks: ['other']
    }),
    // 清理输出目录dist
    new CleanWebpackPlugin()
    // 拷贝静态资源到dist目录，不会进行打包
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(__dirname, 'assets'),
    //     to: 'assets'
    //   }
    // ])

  ],
  // loader
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
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
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
}