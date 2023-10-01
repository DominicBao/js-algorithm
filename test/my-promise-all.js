// 手写Promise.all 
let myPromiseAll = (promiseArray) => {
  return new Promise((resolve, reject) => {
    const result = new Array(promiseArray?.length)
    let successNum = 0
    for (let index = 0; index < promiseArray.length; index += 1) {
      promiseArray[index].then((res) => {
        result[index] = res
        successNum += 1
        if (successNum === promiseArray.length) {
          resolve(result)
        }
      }, (error) => {
        // 有一个错，直接抛出错即可
        reject(error)
      })
    }
  })
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //


let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(2)
  }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(3)
  }, 3000)
})
myPromiseAll([p3, p1, p2]).then(res => {
  console.log(res) // [3, 1, 2]
})