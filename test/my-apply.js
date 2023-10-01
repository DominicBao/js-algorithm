// 手写一个apply
Function.prototype.myApply = function(context, arg) {
  if (typeof this !== 'function') {
    console.warn('类型异常')
    return
  }

  const realContext = context || window
  realContext.fn = this
  const result = realContext.fn(...arg)
  delete realContext.fn
  return result
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

// 测试
function A(a, b) {
  console.log(this.a, a, b)
}

A.apply({a: 1}, [1, 2])  // 1, 2, 2
A.myApply({a: 1}, [1, 2])  // 1, 2, 2