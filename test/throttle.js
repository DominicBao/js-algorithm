// 手写节流
// 一段时间内，只触发第一次
let throttle = (fn, wait) => {
  let timer
  let startTime = 0
  return function(...arg) {
    const nowTime = new Date().valueOf()
    if (timer && nowTime - startTime <= wait) {
      return
    }

    startTime = nowTime
    timer = setTimeout(() => {
      fn(...arg)
      timer = null
    }, [wait])
    
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

fn = throttle(function(params) {
  console.log(params)
}, 4000)

fn(1)
fn(2)
fn(3)