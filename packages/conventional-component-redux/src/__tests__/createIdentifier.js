import createIdentifier from '../createIdentifier'

test('should generate a component identifier with no configuration supplied', () => {
  const identifier = createIdentifier()
  expect(identifier({ id: 100 })).toBe('100')
})

test('should generate a component identifier with configuration supplied', () => {
  const identifier = createIdentifier('Thing', 'name')
  expect(identifier({ name: 'snake-case-name' })).toBe('Thing/snake-case-name')
})
