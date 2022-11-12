// 2.4 js优化

// 静态导入
// import $ from 'jQuery'

// jQuery的页面加载事件
// $(function() {
//   $('<div></div>').html('我是main.js').appendTo('body')
// })


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