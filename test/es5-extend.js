// es5去实现一个继承
function Parent() {
  this.a = 'parent'
}

function Children() {
  Parent.call(this)
  this.b = 'children'
}

let children = new Children()


// Children.prototype = Object.create(Parent.prototype)
// 上面这个创建也可以这样写，更容易理解
function F() {}
F.prototype = Parent.prototype
Children.prototype = new F()

Children.prototype.constructor = Children