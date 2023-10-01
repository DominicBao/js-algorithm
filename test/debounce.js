// 手写防抖
// wait时间内触发多次，最后一次有效
let debounce = (fn, wait) => {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, wait)
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

fn = debounce(function(params) {
  console.log(params)
}, 4000)

fn(1)
fn(2)
fn(3)