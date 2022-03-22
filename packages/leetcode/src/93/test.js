import foo from '.'

test('25525511135', () => {
  expect(foo('25525511135')).toEqual(['255.255.11.135', '255.255.111.35'])
})

test('0000', () => {
  expect(foo('0000')).toEqual(['0.0.0.0'])
})
