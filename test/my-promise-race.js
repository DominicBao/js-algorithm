// 手写Promise.race 一个结束即返回
let myPromiseRace = (promiseArray) => {
  return new Promise((resolve, reject) => {
    for (let index = 0; index < promiseArray.length; index += 1) {
      promiseArray[index].then((res) => {
        resolve(res)
      }, (error) => {
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
myPromiseRace([p3, p1, p2]).then(res => {
  console.log(res) // 1
})