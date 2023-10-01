// 经典面试题
// 手写一个new
const ObjectFactory = (obj, ...arg) => {
  // 先判断obj是否是个function
  if (!obj || typeof obj !== 'function') {
    console.warn('参数有误')
    return
  }
  // 创造一个 构造函数 是 传入函数的构造函数 的对象
  const newObj = Object.create(obj?.prototype);

  // 让传入对象的this指向新对象，并执行
  const data = obj.apply(newObj, ...arg)
  // 如果返回值是方法或者object，返回返回值，否则返回对象本身
  if (data && (typeof data === 'function' || typeof data === 'object')) {
    return data
  } else {
    return newObj
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

// 测试
// 注意不能用class测试，因为class只能用new创建
function Test1(a, b) {
  this.a = a
  this.b = b
}

Test1.prototype.getA = function(){
  return this.a
}
const t = ObjectFactory(Test1, [2, 3])
t.a // 2
t.b // 3
t.getA() // 2