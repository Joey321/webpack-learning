// 2.4 js优化

// 静态导入
// import $ from 'jQuery'

// jQuery的页面加载事件
// $(function() {
//   $('<div></div>').html('我是main.js').appendTo('body')
// })
import moment from 'moment'
// locale被IgnorePlugin忽略 这里按需引入zh-CN语言包
import 'moment/locale/zh-cn'

moment.locale('zh-CN');
const m = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log('当前时间---', m);

// 动态导入
function getDiv() {
  // 使用import('')语法进行动态导入
  // ES6中导入的模块默认为default
  return import('jQuery').then(({ default: $ }) => $('<div></div>').html('我是main.js~'))
}


// 动态加载的好处
// 演示点击按钮动态追加DOM元素到页面
window.onload = function() {
  document.getElementById('btn').onclick = function() {
    getDiv().then(div => {
      div.appendTo('body')
    })
  }
}