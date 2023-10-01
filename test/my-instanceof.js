// 手写Instanceof
const myInstanceof = (left, right) => {
  let leftProto = Object.getPrototypeOf(left)
  let rightProto= right.prototype

  while(true) {
    if (!leftProto) return false
    if (rightProto === leftProto) return true
    leftProto = Object.getPrototypeOf(leftProto)
  }
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

// test
class Car {
  constructor(a) {
    this.a = a
  }
}

class Car2 {
  constructor(a) {
    this.a = a
  }
}

const car = new Car()
car instanceof Car // true
car instanceof Car2 // false

myInstanceof(car, Car) // true
myInstanceof(car, Car2) // false