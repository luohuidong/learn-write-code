export default (digits) => {
  let result = []

  if (!digits) {
    return result
  }

  // 建立电话号码键盘映射
  let map = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z']
  }
  
  // 将输入的字符串按单字符分割成数组, 23=>[2, 3]
  let numArr = [...digits]

  return numArr.reduce((accumulator, currentValue, currentIndex) => {
    if (currentIndex === 0) {
      return map[currentValue]
    } else {
      let newAccumulator = []

      for(let accumulatorItem of accumulator) {
        for(let value of map[currentValue]) {
          newAccumulator.push(`${accumulatorItem}${value}`)
        }
      }
      return newAccumulator
    }
  }, [])
}