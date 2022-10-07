// CommonJS规范 可以在node开发使用 浏览器中不支持 通过webpack打包后即可支持
// let a = require('./a.js')

// 浏览器开发通常使用ES6规范
import { name } from './a.js'
import './css/index.css'
import './less/index.less'

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