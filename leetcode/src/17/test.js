import foo from '.'

test('2', () => {
  expect(foo('2')).toEqual(['a', 'b', 'c'])
})

test('23', () => {
  expect(foo('23')).toEqual(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'])
})

test('telComb:234', () => {
  expect(foo('234')).toEqual([
    'adg', 'adh', 'adi',
    'aeg', 'aeh', 'aei',
    'afg', 'afh', 'afi',
    'bdg', 'bdh', 'bdi',
    'beg', 'beh', 'bei',
    'bfg', 'bfh', 'bfi',
    'cdg', 'cdh', 'cdi',
    'ceg', 'ceh', 'cei',
    'cfg', 'cfh', 'cfi'
  ])
})

test('236', () => {
  expect(foo('236')).toEqual([
    'adm','adn','ado','aem','aen','aeo','afm','afn','afo',
    'bdm','bdn','bdo','bem','ben','beo','bfm','bfn','bfo',
    'cdm','cdn','cdo','cem','cen','ceo','cfm','cfn','cfo'
  ])
})