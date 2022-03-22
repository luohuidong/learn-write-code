var firstMissingPositive = function (arr) {
  // 过滤掉非正整数
  arr = arr.filter(item => item > 0)

  // 过滤之后的数组如果长度为 0，则直接返回 1
  if (arr.length === 0) {
    return 1
  }

  // 对数组进行正序排序
  arr.sort((a, b) => a - b)

  if (arr[0] !== 1) {
    // 如果第一个元素不是 1，则表示最小正整数为 1
    return 1
  } else {
    // 如果第一个元素是 1，则遍历数据，看下一个元素和当前元素相差是否大于 1
    // 如果相差大于 1，当前值 +1 即为缺失最小正整数
    const len = arr.length
    for (let i = 0; i < len - 1; i++) {
      if (arr[i + 1] - arr[i] > 1) {
        return arr[i] + 1
      }
    }

    // 如果数组是连续的正整数，最后一个元素 +1 即为缺失的最小正整数
    return arr.pop() + 1
  }
}

export default firstMissingPositive