let PENDING = 'pending'
let FULFILLED = 'fulfilled'
let REJECTED = 'rejected'

// 手写一个promise
function MyPromise(fn) {
  let self = this

  self.state = PENDING // rejected fulfilled
  self.value = null
  self.reason = null

  // pending时的缓存数组
  self.resolveBackArray = []
  self.rejectBackArray = []

  // 成功时调用
  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    if (self.state === PENDING) {
      self.state = FULFILLED
      self.value = value
      self.resolveBackArray.forEach(item => {
        item(value)
      })
    }
  }

  // 失败时调用
  function reject(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    if (self.state === REJECTED) {
      self.state = REJECTED
      self.reason = value
      self.rejectBackArray.forEach(item => {
        item(value)
      })
    }
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

MyPromise.prototype.then = function(onResolve, onReject) {
  return new MyPromise((resolve, reject) => {
    const realResolveFun = typeof onResolve === 'function' ? onResolve : () => {}
    const realRejectFun = typeof onReject === 'function' ? onReject : (error) => {throw error}
  
    // 如果状态是等待，将then函数放入
    if (this.state === PENDING) {
      this.resolveBackArray.push(() => {
        const result = realResolveFun(this.value)
        return result instanceof MyPromise ? result.then(resolve, reject) : result
      })
      this.rejectBackArray.push(() => {
        const result = realRejectFun(this.value)
        return result instanceof MyPromise ? result.then(resolve, reject) : result
      })
    }
  
    // 如果其他状态，返回对应的值
    if (this.state === FULFILLED) {
      try {
        const result = realResolveFun(this.value)
        return result instanceof MyPromise ? result.then(resolve, reject) : result
      } catch (error) {
        reject(error)
      }
    }
  
    if (this.state === REJECTED) {
      try {
        const result = realRejectFun(this.value)
        return result instanceof MyPromise ? result.then(resolve, reject) : result
      } catch (error) {
        reject(error)
      }
    }
  })
  
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //


let testPromise1 = new MyPromise((resolve, reject) => {
  resolve(1)
})

let testPromise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 5000)
})

let testPromise3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 8000)
})

testPromise1.then((res) => {
  console.log(res, 'res')
})

testPromise2.then((res) => {
  console.log(res, 'res2')
  return testPromise3
}).then((res) => {
  console.log(res, 'res3')
})



// let testPromise1 = new MyPromise((resolve, reject) => {
//   resolve(1)
// })

// let testPromise2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2)
//   }, 10000)
// })

// let testPromise3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(testPromise4)
//   }, 12000)
// })

// let testPromise4 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3)
//   }, 20000)
// })

// testPromise1.then((res) => {
//   console.log(res, 'res')
// })

// testPromise2.then((res) => {
//   console.log(res, 'res2')
//   return testPromise3
// }).then((res) => {
//   console.log(res, 'res3')
// })
