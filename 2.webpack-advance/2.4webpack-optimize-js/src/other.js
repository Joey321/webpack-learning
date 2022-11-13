// main.js和other.js都引入了jQuery，并不需要各自导入(优化：通过splitChunksPlugin抽取公共代码)

// import $ from 'jQuery'

// $(function() {
//   $('<div></div>').html('我是other.js').appendTo('body')
// })