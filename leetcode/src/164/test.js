import foo from '.'

test('[3,6,9,1]', () => {
  expect(foo([3,6,9,1])).toBe(3)
})

test('[10]', () => {
  expect(foo([10])).toBe(0)
})

test('[13, 16, 19, 1]', () => {
  expect(foo([13, 16, 19, 1])).toBe(12)
})