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
  // 优化配置
  optimization: {
    // 分割chunks中的公共代码
    splitChunks: {
      chunks: 'all', // 可选值initial|async 默认为async，只会对异步加载的模块进行代码分割
      minSize: 30000, // 模块最少大于30kB才进行拆分
      maxSize: 0, // 模块大小无上限，不进一步拆分，一般设置minSize就可以
      minChunks: 1, // 模块最少引用1次才会被拆分
      maxAsyncRequests: 5, // 异步加载时同时发送的请求数量最大不能超过5，超过部分不拆分
      maxInitialRequests: 3, // 页面初始化时同时发送的请求数量最大不能超过3，超过部分不拆分
      automaticNameDelimiter: '~', // 默认的连接符
      name: true, // 拆分的chunk名，根据模块名(entry)和CacheGroups中的key自动生成,使用连接符进行连接
      cacheGroups: {
        vendors: { // 自定义缓存组名
          test: /[\\/]node_modules[\\/]/, // 模块在node_modules目录下就用以上配置拆分到该组
          priority: -10, // 权重
          // filename: 'vendors.js' // 指定缓存组名(不会使用自动生成的组名)
        },
        default: { // 默认缓存组名
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true // 若主入口中引入两个模块，其中一个正好引用了后一个，就会直接复用，不会引用两次
        },
      }
    }
  },
  // 入口
  entry: {
    main: './src/main.js'
  },
  // 配置多入口
  // entry: {
  //   main: './src/main.js',
  //   other: './src/other.js'
  // },
  // 出口，指定绝对路径/输出文件名称
  output: {
    path: path.join(__dirname, '..', './dist'),
    filename: '[name].bundle.js'
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