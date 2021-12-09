// 使用二进制数进行存储数据
// 比如2,4,5,7 用二进制表示即可表示成  00101101 00000000 00000000 00000000
// 这样表示一个数的空间使用率为原来的1/32
// 但有一定的弊端，只适用于正整数，也不适合但有重复数字的排序
// 适合大量数据的手机号或者qq号的去重，适合不重复数据的排序等

class BitMap{
  data = []
  // 实例化的时候默认给一个32位的空间
  // 由于js的数组可以自动扩充，此处不申明length
  constructor() {
    this.data = new Array(1).fill(0)
  }

  _getIndex(value) {
    // 数组索引
    const arrayIndex = Math.floor(value / 32)
    // bit索引
    const bitIndex = value % 32
    return {arrayIndex, bitIndex}
  }

  // 往bitMap中加入某个数
  add(value) {
    const {arrayIndex, bitIndex} = this._getIndex(value)
    this.data[arrayIndex] = this.data[arrayIndex] | 1 << bitIndex
  }

  // 判断某个数是否存在
  isExist(value) {
    const {arrayIndex, bitIndex} = this._getIndex(value)
    return this.data[arrayIndex] & 1 << bitIndex ? true : false
  }

  // 获取不重复的所有数据
  getData() {
    const result = []
    for(let i = 0; i < this.data.length * 32; i += 1) {
      if (this.isExist(i)){
        result.push(i)
      }
    }
    return result
  }
}