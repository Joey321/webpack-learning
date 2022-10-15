// CommonJS规范 可以在node开发使用 浏览器中不支持 通过webpack打包后即可支持
// let a = require('./a.js')

// 浏览器开发通常使用ES6规范
import { name } from './a.js'
import './css/index.css'
import './less/index.less'

import $ from 'jquery'

import axios from 'axios'

console.log(`index.js输出一句话---引用了${name}`);

setTimeout(function() {
  console.log('setTimeout---匿名函数');
})
setTimeout(() => {
  console.log('setTimeout---箭头函数不改变内部this指向');
})

function *fn() {
  yield 1
  yield 2
  return 3
}

let newFn = fn()
console.log(newFn.next()); //1
console.log(newFn.next()); //2
console.log(newFn.next()); //3
console.log(newFn.next()); //undefined

$('body').css("backgroundColor", "lightGreen")

console.log('$---', $)
console.log('window.$---', window.$)

console.log('IS_DEV---', IS_DEV);

// 学习解决跨域问题
// 1.jsonp(淘汰)
// 2.cors 直接跨域请求 需要后端配合 设置响应头Access-Control-Allow-Origin
// axios.get('http://localhost:9999/api/getUserInfo')
// .then(res => {
//   console.log('res-cors方案---', res);
// })

// 3.http proxy
// 配置devServe下的proxy节点 然后就可以直接请求本域
axios.get('/api/getUserInfo')
.then(res => {
  console.log('res2-proxy方案---', res);
})