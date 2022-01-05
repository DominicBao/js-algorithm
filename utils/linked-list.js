// 链表，适合有大量的增删场景，不适合大量的改场景
// 链表由具有两个属性的节点组成：数据和指针，链表中的第一个节点称为head
// 链表中的每一个指针指向链表的下一个节点，最后一个节点的指针指向null
//
//           Head
//   | Data | Pointer |  ------>  | Data | Pointer |  ------>  | Data | Pointer   ------>   null

// 先定义一个节点类
class Node {
  value = undefined
  next = null

  constructor(value) {
    // 初始的值
    this.value = value
    // 指针的下一个指向，默认为null
    this.next = null
  }
}

// 再定义一个完整的链表类
class LinkedList {
  // 头节点
  head = null
  // 尾节点
  tail = null
  length = 0

  constructor() {
    this.head = null
    this.tail = this.head
    this.length = 0
  }
}