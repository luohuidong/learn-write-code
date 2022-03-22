const match = str => {
  // 开头匹配一个以上的 0 或者 1 的字符串
  let j=str.match(/^(0+|1+)/)[0]

  // 使用异或的方式，如果如果 j 是多个 0 构成，o 获取相同个数的 1
  // 如果 j 是多个 1 构成，则 o 获取相同个数的 0
  let o = (j[0] ^ 1).toString().repeat(j.length)

  // 目标字符串
  const target = `${j}${o}`
  return str.startsWith(target)
}

export default (str) => {
  let count = 0
  
  for(let i=0, len = str.length - 1; i < len; i++) {
    let result = match(str.slice(i))

    if (result) {
      count++
    }
  }

  return count
}