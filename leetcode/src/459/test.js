import foo from '.'

test('459 abab', () => {
  expect(foo('abab')).toBe(true)
})

test('459 aba', () => {
  expect(foo('aba')).toBe(false)
})

test('459 abcabcabcabc', () => {
  expect(foo('abcabcabcabc')).toBe(true)
})