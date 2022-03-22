class simpleStack {
  constructor() {
    this.items = []
  }
  pop() {
    return this.items.pop()
  }
  push(element) {
    element = Number(element)
    return this.items.push(element)
  }
  peek(quantity) {
    let elements = [] // 栈顶元素在第一位
    const length = this.items.length

    for(let i = length-1; i > length-1-quantity; i--) {
      elements.push(this.items[i])
    }
    return elements
  }
}

/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
  let stack = new simpleStack()
  
  // 对数组进行遍历，遍历的目的是处理得分
  ops.forEach(item => {
    switch(item) {
      case 'C':
        // 最后一轮有效得分改为无效。
        if (stack.length === 0) return
        stack.pop()
        break
      case 'D':
        // 该轮得分为最后一轮有效得分的两倍。
        if (stack.length === 0) return
        stack.push(stack.peek(1)[0] * 2)
        break
      case '+':
        if (stack.length < 2) return
        {
          const points = stack.peek(2)
          stack.push(points[0]+points[1])
        }
        break
      default:
        stack.push(item)
    }
  })
  
  return stack.items.reduce((accumulator, currentValue) => accumulator + currentValue)
}

export default calPoints