var restoreIpAddresses = function (s) {
  // 保存所有符合条件的 ip
  let r = []

  let search = (cur, sub) => {
    // cur 中存在 4 元素
    if (cur.length === 4) {
      // 如果 4 元素组合成字符串与 s 相同，则保存，否则直接退出递归
      if (cur.join('') === s) {
        r.push(cur.join('.'))
      } else {
        return
      }
    }

    // 每一部分的字符串长度最大为 3，但剩余的字符串可能存在小于 3 位的情况
    const len = Math.min(3, sub.length)
    for(let i=0; i < len; i++) {
      // 获取子字符串
      const tmp = sub.substr(0, i+1)
      if (tmp < 256) {
        // 如果 tmp 开头是 0，并且 tmp 长度大于一，则直接退出递归
        // 对应 010 等 0 开头的直接退出不需要处理，但是得保留 0 这种情况
        if (tmp.startsWith('0') && tmp.length > 1) return

        search(cur.concat(tmp), sub.substr(i+1))
      }
    }
  }

  search([], s)

  return r
}


export default restoreIpAddresses