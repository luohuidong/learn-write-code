import foo from '.'

test('[3,2,1,5,6,4] and k = 2', () => {
  expect(foo([3,2,1,5,6,4], 2)).toBe(5)
})

test('[3,2,3,1,2,4,5,5,6] and k = 4', () => {
  expect(foo([3,2,3,1,2,4,5,5,6], 4)).toBe(4)
})