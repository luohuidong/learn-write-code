var maximumGap = function (nums) {
  if (nums.length < 2) {
    return 0
  }

  let maxDiff = 0

  const len = nums.length

  for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
    // 确保第一轮循环不计算差值
    if (i < len - 1) {
      maxDiff = nums[i + 1] - nums[i]
    }
  }

  // 由于在循环中，i 不会等于 0，所以在 return 中需补充这种情况。
  return Math.max(maxDiff, nums[1] - nums[0])
}

export default maximumGap