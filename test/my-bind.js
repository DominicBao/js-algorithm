// 手写一个bind
Function.prototype.myBind = function(context, ...arg) {
  if (typeof this !== 'function') {
    console.log('类型异常')
    return
  }

  const realContext = context || window
  const self = this
  const fBound = function Fn() {
    // 这里要考虑myBind做成构造函数的情况 new XX 所以要判断this instanceof Fn
    // 这里还要判断bind支持定义的时候传一半的参数然后使用的时候再传一半，所以要使用[...arg, ...arguments]这种写法
    return self.apply(this instanceof Fn ? this : realContext, [...arg, ...arguments])
  }
  // 将返回的函数的prototype置为当前函数的prototype，让实例去继承函数的原型中的值
  fBound.prototype = Object.create(this.prototype)
  return fBound
}