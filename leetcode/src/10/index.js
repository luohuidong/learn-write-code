const isMatch = (s, p) => {
  // 边界问题：考虑 p 为空的情况，这个与处理 s 边界问题是类似的
  if (!p) {
    return s ? false : true
  }

  // 判断 s 的第一个字符是否与 p 的第一个字符匹配
  let isFirstCharactorMatched = false
  if (s && (p[0] === s[0] || p[0] === '.')) {
    isFirstCharactorMatched = true
  }

  // 判断 p 第二位为 * 的情况
  if (p.length > 1 && p[1] === '*') {
    return isMatch(s, p.slice(2)) || (isFirstCharactorMatched && isMatch(s.slice(1), p))
  } else {
    return isFirstCharactorMatched && isMatch(s.slice(1), p.slice(1))
  }
}

export default isMatch