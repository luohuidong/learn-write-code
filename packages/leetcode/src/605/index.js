function getMaxAmount(arr, type) {
  if (!arr) return 0
  return arr.map(element => {
    const max = type === '2n' ? element.length / 2 : (element.length -1) / 2
    return max > 0 ? Math.floor(max) : 0
  }).reduce((sum, currentNumber) => {
    sum += currentNumber
    return sum
  })
}

function canPlaceFlowers (flowerbed, n) {
  // [0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0] => 0010001000001000
  const str = flowerbed.join('')

  // 如果仅有一个 0 ，则元素中 0 的数量满足 2n - 1，最大的种花量为 n
  if (!str.includes('1')) {
    return Math.floor((str.length + 1) / 2) >= n
  }

  // 0010001000001000 => ["00", "000"]
  // 匹配 0 再开头或结尾的情况，如果元素中 0 的数量满足 2n，则最大种花量为 n
  const startEnd = str.match(/^(0+)(?=1)|(?<=1)(0+)$/g)
  const startEndMaxAmount = getMaxAmount(startEnd, '2n')
  
  // 0010001000001000 => ["000", "00000"]
  // 匹配 0 在两个 1 之间的情况，如果元素中 0 的数量满足 2n+1，则最大种花两为 n
  const middle = str.match(/(?<=1)(0+)(?=1)/g)
  const middleMaxAmount = getMaxAmount(middle, '2n+1')

  if (startEndMaxAmount + middleMaxAmount >= n) {
    return true
  }
  return false
}

export default canPlaceFlowers