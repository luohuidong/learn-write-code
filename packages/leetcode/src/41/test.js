import foo from '.'

test('[1,2,0]', () => {
  expect(foo([1,2,0])).toBe(3)
})

test('[3,4,-1,1]', () => {
  expect(foo([3,4,-1,1])).toBe(2)
})

test('[7,8,9,11,12]', () => {
  expect(foo([7,8,9,11,12])).toBe(1)
})