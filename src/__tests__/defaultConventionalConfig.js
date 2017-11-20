import React from 'react'

import defaultConventionalConfig from '../defaultConventionalConfig'

test('throw if no actions', () => {
  expect(() => defaultConventionalConfig()).toThrow(
    'conventional-component#asConnectedComponent() should be passed an `actions` object containing action creators.'
  )
})

test('throw if no withLogic higher-order component', () => {
  expect(() =>
    defaultConventionalConfig({
      actions: {}
    })
  ).toThrow(
    'conventional-component#asConnectedComponent() should be passed a `withLogic()` higher-order component.'
  )
})

test('throw if no template component', () => {
  expect(() =>
    defaultConventionalConfig({
      actions: {},
      withLogic: Component => Component
    })
  ).toThrow(
    'conventional-component#asConnectedComponent() should be passed a `Template` component.'
  )
})

test('throw if no reducer name', () => {
  expect(() =>
    defaultConventionalConfig({
      actions: {},
      withLogic: Component => Component,
      Template: () => <div>Test</div>
    })
  ).toThrow(
    'conventional-component#asConnectedComponent() should be passed the `REDUCER_NAME` key that contains the state or given a reducer with a name.'
  )
})

test('return valid conventional component configuration', () => {
  const config = {
    actions: {},
    withLogic: Component => Component,
    Template: () => <div>Test</div>,
    REDUCER_NAME: 'components'
  }
  expect(defaultConventionalConfig(config)).toEqual({
    ...config,
    COMPONENT_NAME: 'Template',
    COMPONENT_KEY: 'id'
  })
})
