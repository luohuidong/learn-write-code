import foo from '.'

test('89', () => {
  expect(foo(2)).toEqual([0,1,3,2])
})

test('89', () => {
  expect(foo(0)).toEqual([0])
})