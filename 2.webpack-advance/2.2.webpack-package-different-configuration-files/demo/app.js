const express = require('express')
const app = express()

// cors解决跨域问题
// const cors = require('cors')

// app.use(cors())

// app.get('/api/getUserInfo', (req, res) => {
app.get('/getUserInfo', (req, res) => {
  // 服务器监听'/getUserInfo'路径
  // 当客户端请求该地址('http://localhost:9999/getUserInfo')，则向客户端响应一个对象
  res.send({
    name: '黑马儿',
    age: 13
  })
})

app.listen(9999, () => {
  console.log('成功访问http://localhost:9999');
})