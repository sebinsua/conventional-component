import defaultIdentifier from '../defaultIdentifier'

test('should respond with an identifier given a props containing id', () => {
  expect(defaultIdentifier({ id: 1 })).toBe('Component/1')
})
