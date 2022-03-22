import foo from '.'

test('[1,2,3,4,4,3,2,1]', () => {
  expect(foo([1,2,3,4,4,3,2,1])).toBe(true)
})

test('[1,1,1,2,2,2,3,3]', () => {
  expect(foo([1,1,1,2,2,2,3,3])).toBe(false)
})

test('[1]', () => {
  expect(foo([1])).toBe(false)
})

test('[1,1]', () => {
  expect(foo([1,1])).toBe(true)
})