// @flow

import type { ComponentType } from 'react'
import type { Action, ActionCreator, LifecycleActions } from './actions'

import getDisplayName from './getDisplayName'

type Reducer<ReducerState, Actions> = (
  state: ReducerState,
  action: Actions
) => ReducerState

type ConventionalActionCreators = {
  [actionName: string]: ActionCreator<LifecycleActions | Action<*, *>>
}
type WithLogic = (TemplateComponent: ComponentType<*>) => ComponentType<*>
opaque type ComponentName: string = string
opaque type ComponentKey: string = string
opaque type ReducerName: string = string

type ConventionalConfig = {
  actions: ConventionalActionCreators,
  withLogic: WithLogic,
  Template: ComponentType<*>,
  reducer: Reducer<*, *>,
  REDUCER_NAME?: ReducerName,
  COMPONENT_NAME?: ComponentName,
  COMPONENT_KEY?: ComponentKey
}
type CompleteConventionalConfig = {
  actions: ConventionalActionCreators,
  withLogic: WithLogic,
  Template: ComponentType<*>,
  reducer: Reducer<*, *>,
  REDUCER_NAME: ReducerName,
  COMPONENT_NAME: ComponentName,
  COMPONENT_KEY: ComponentKey
}

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
): CompleteConventionalConfig => {
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
    reducer,
    REDUCER_NAME,
    COMPONENT_NAME,
    COMPONENT_KEY
  }
}

export type {
  ConventionalConfig,
  ConventionalActionCreators,
  WithLogic,
  ComponentName,
  ComponentKey,
  ReducerName
}
export default defaultConventionalConfig
