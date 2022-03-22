export default (str) => {
  const strArr = str.split(/\s/)
  const result =  strArr.map(item => {
    const charArr = [...item]
    return charArr.reverse().join('')
  }).join(' ')
  return result
}