// webpack配置文件遵循CommonJS规范

const path = require('path')

module.exports = {
  // 入口
  entry: './src/main.js',
  // 出口，指定绝对路径/输出文件名称
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'custom-bundle.js'
  },
  mode: 'production'
}