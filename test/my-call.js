// 手写一个call
// 在Function的构造函数中加入myCall方式，方便调用
Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== 'function') {
    console.warn('类型异常')
    return
  }
  // 没有传入的上下文，就用window的上下文
  const realContext = context || window
  realContext.fn = this
  const result = realContext.fn(...args)
  delete realContext.fn
  return result
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

// 测试
function A(a, b) {
  console.log(this.a, a, b)
}

A.call({a: 1}, 1, 2)  // 1, 2, 2
A.myCall({a: 1}, 1, 2)  // 1, 2, 2