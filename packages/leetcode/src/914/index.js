/**
 * 获取两个数的最大公约数
 * @param {number} a 数字 a
 * @param {number} b 数字 b
 */
function getHighestCommonFactor(a, b) {
  let large
  let small

  if (a > b) {
    large = a
    small = b
  } else {
    large = b
    small = a
  }
  // 取余
  const remainder = large % small

  // 如果余数为 0，b 的最大公约数
  if (remainder === 0) {
    return small
  }

  return getHighestCommonFactor(small, remainder)
}

export default function(deck) {
  // 如果 deck 仅有一个元素的时候，直接返回 false
  if (deck.length === 0) {
    return false
  }

  // 对卡牌进行排序, 并转换为字符串
  // [1, 3, 4, 1, 4, 3] => 1 1 3 3 4 4
  const str = deck.sort((a, b) => a-b).join(' ')

  // 利用正则表达式将相同数字的卡牌分成一组
  /// 1 1 3 3 4 4 => ["1 1", "2 2", "3 3", "4 4"]
  const regex = /(\d+)(\s\1)*/g
  let group = str.match(regex)

  // 将 group 中的元素转换成每组中卡牌的数量
  // ["1 1", "2 2", "3 3", "4 4"] => [2, 2, 2, 2]
  let newGroup = []
  for(let element of group) {
    const amount = element.split(/\s/).length
    if (amount === 1) {
      // 如果发现一组中仅有一张卡牌，直接结束函数
      return false
    }
    newGroup.push(amount)
  }

  group = newGroup
  
  while(group.length > 1) {
    const a = group.shift()
    const b = group.shift()
    
    // a, b 获取最大公约数
    const highestCommonFactor = getHighestCommonFactor(a, b)
  
    if (highestCommonFactor === 1) {
      // 如果最大公约数为 1，则表示这这两组卡牌的数量互质，直接退出函数
      return false
    } else {
      group.unshift(highestCommonFactor)
    }
  }

  return true
}
