import getDisplayName from '../getDisplayName'

test('should respond with the displayName of a component if it is set', () => {
  class Component {}
  Component.displayName = 'DisplayName'
  expect(getDisplayName(Component, 'default')).toBe(Component.displayName)
})

test('should respond with the name of a component if there is no displayName', () => {
  class Component {}
  expect(getDisplayName(Component, 'default')).toBe(Component.name)
})

test('should respond with the default if there is neither a displayName or name', () => {
  expect(getDisplayName(() => undefined, 'default')).toBe('default')
})
