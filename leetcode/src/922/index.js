var sortArrayByParityII = function (A) {
  // 声明个空数组用来存储奇偶排序后的数组
  let result = []

  // 记录奇数、偶数位下标
  let odd = 1
  let even = 0

  // 对数组进行遍历
  A.forEach(item => {
    if (item % 2 === 0) {
      result[even] = item
      even += 2
    } else {
      result[odd] = item
      odd += 2
    }
  })

  return result
}

export default sortArrayByParityII