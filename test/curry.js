// 函数柯里化
// funcA(funcB)(x1)(x2)(x3)() 的结果等同于 funcB(x1, x2, x3)
let curry = (fn) => {
  const len = fn.length
  let argArray = []
  const nextFn = (...args) => {
    argArray = argArray.concat(...args)
    if (argArray?.length >= len) {
      return fn(...argArray)
    } else {
      return nextFn
    }
  }
  return nextFn
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

function funcX(x1, x2, x3){
  x4 = x1 + x2 + x3
  console.log(x1, x2, x3, x4)
}
curry(funcX)(1)(2)(3)(4) // 1 2 3 6