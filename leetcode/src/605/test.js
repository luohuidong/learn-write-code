import foo from '.'

test('flowerbed = [1,0,0,0,1], n = 1', () => {
  expect(foo([1,0,0,0,1], 1)).toBe(true)
})

test('flowerbed = [1,0,0,0,1], n = 2', () => {
  expect(foo([1,0,0,0,1], 2)).toBe(false)
})

test('flowerbed = [1,0,0,0,1,0,0,0,0,0,1], n = 3', () => {
  expect(foo([1,0,0,0,1,0,0,0,0,0,1], 3)).toBe(true)
})

test('flowerbed = [1,0,0,1,0,0,1,1,0,0,0,0,1], n = 2', () => {
  expect(foo([1,0,0,0,0,0,1], 2)).toBe(true)
})

test('flowerbed = [0,0,1,0,1], n = 1', () => {
  expect(foo([0,0,1,0,1], 1)).toBe(true)
})

test('flowerbed = [0], n = 1', () => {
  expect(foo([0], 1)).toBe(true)
})

test('flowerbed = [0,0,0], n = 2', () => {
  expect(foo([0,0,0], 2)).toBe(true)
})