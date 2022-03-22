import foo from '.'

test('s = "barfoothefoobarman", words = ["foo","bar"]', () => {
  expect(foo('barfoothefoobarman', ['foo', 'bar'])).toEqual([0, 9])
})

test('s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]', () => {
  expect(foo('wordgoodgoodgoodbestword', ['word','good','best','word'])).toEqual([])
})

test('s = "wordgoodgoodgoodbestword", words = ["word","good","best","good"]', () => {
  expect(foo('wordgoodgoodgoodbestword', ['word','good','best','good'])).toEqual([8])
})

test('s = "foobarfoobar", words = ["foo","bar"]', () => {
  expect(foo('foobarfoobar', ['foo','bar'])).toEqual([0,3,6])
})

test('s = "", words = []', () => {
  expect(foo('', [])).toEqual([])
})

test('s = "aaa", words = ["a","a"]', () => {
  expect(foo('aaa', ['a','a'])).toEqual([0,1])
})
