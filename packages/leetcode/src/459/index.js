/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
  const regex = /^(\w+)\1+$/g
  return regex.test(s)
}

export default repeatedSubstringPattern