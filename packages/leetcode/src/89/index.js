function recursion(n) {
  if (n === 0) {
    return ['0']
  } else if (n === 1) {
    return ['0', '1']
  } else {
    // 获取 n-1 的 Gray Code
    let prev = recursion(n - 1)
    // 保存 Gray Code
    let result = []
    // 获取 n 的 Gray Code 数组的最大索引
    const maxIndex = Math.pow(2, n) - 1
    for (let i = 0, len = prev.length; i < len; i++) {
      result[i] = `0${prev[i]}`
      result[maxIndex-i] = `1${prev[i]}`
    }
    return result
  }
}

const grayCode = function (n) {
  return recursion(n).map(element => {
    return parseInt(element, 2)
  })
}

export default grayCode