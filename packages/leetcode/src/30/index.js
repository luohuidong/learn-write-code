/**
 * 对 words 进行排列组合
 * @param {array} preCombination 前一次组合的结果，初始值应为 []
 * @param {array} preWords 经过前一次组合之后，剩余的 words，初始值应为 words
 * @param {array} words 与题目中传入的 words 相同
 * @param {array} combinationStrResult 用来存储排列组合结果
 */
function arrange (preCombination, preWords, words, combinationStrResult) {
  // 当组合的数组长度与 words 的数组长度相同，表示排列组合已完成
  // 将数组转换为字符串存入 combinationStrResult 中
  if (preCombination.length === words.length) {
    combinationStrResult.push(preCombination.join(''))
  } else {
    preWords.forEach((item, index) => {
      let tmp = [...preWords]
      tmp.splice(index, 1)
      arrange(preCombination.concat(item), tmp, words, combinationStrResult)
    })
  }
}

export default (s, words) => {
  if (!s || words.length === 0) {
    return []
  }

  let combinationStrResult = []
  arrange([], words, words, combinationStrResult)

  let indexs = [] // 存储匹配到的字符串的开始索引位置

  combinationStrResult.forEach(element => {
    const reg = new RegExp(element, 'g')

    function match() {
      let result = reg.exec(s)
      if (result) {
        indexs.push(result.index)
        // 将下一轮的正则匹配从这一轮匹配的首个字符的索引后一位开始匹配
        reg.lastIndex = result.index + 1
        match()
      }
    }
    match()

  })
  
  indexs.sort((a, b) => a - b)

  // 去重
  return Array.from(new Set(indexs))
}  