import foo from '.'

test('example1', () => {
  expect(foo('aa', 'a')).toBe(false)
})

test('example2', () => {
  expect(foo('aa', 'a*')).toBe(true)
})

test('example3', () => {
  expect(foo('ab', '.*')).toBe(true)
})

test('example4', () => {
  expect(foo('aab', 'c*a*b')).toBe(true)
})

test('mississippi', () => {
  expect(foo('mississippi', 'mis*is*p*.')).toBe(false)
})