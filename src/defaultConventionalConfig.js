// @flow

import type { ConventionalConfig } from './asConnectedComponent'

import getDisplayName from './getDisplayName'

const DEFAULT_REDUCER_NAME = 'reducer'
const DEFAULT_COMPONENT_NAME = 'Template'
const DEFAULT_COMPONENT_KEY = 'id'

const defaultConventionalConfig = (
  {
    actions,
    withLogic,
    Template,
    reducer,
    REDUCER_NAME = getDisplayName(reducer, 'reducer'),
    COMPONENT_NAME = getDisplayName(Template, 'Template'),
    COMPONENT_KEY = DEFAULT_COMPONENT_KEY
  }: ConventionalConfig = {}
) => {
  if (!actions || typeof actions !== 'object') {
    throw new Error(
      'conventional-component#asConnectedComponent() should be passed an `actions` object containing action creators.'
    )
  }

  if (!withLogic || typeof withLogic !== 'function') {
    throw new Error(
      'conventional-component#asConnectedComponent() should be passed a `withLogic()` higher-order component.'
    )
  }

  if (!Template || typeof Template !== 'function') {
    throw new Error(
      'conventional-component#asConnectedComponent() should be passed a `Template` component.'
    )
  }

  if (!REDUCER_NAME || typeof REDUCER_NAME !== 'string') {
    throw new Error(
      'conventional-component#asConnectedComponent() should be passed the `REDUCER_NAME` key that contains the state or given a reducer with a name.'
    )
  }

  return {
    actions,
    withLogic,
    Template,
    REDUCER_NAME,
    COMPONENT_NAME,
    COMPONENT_KEY
  }
}

export default defaultConventionalConfig
