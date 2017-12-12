// @flow

import type { ComponentType } from 'react'
import type { LifecycleActions, Action } from './actions'
import type { Reducer } from './withReducerIdentity'
import type {
  ActionCreator,
  ComponentName,
  ComponentKey,
  ReducerName
} from './types'

import { connect, bindActionCreators } from './redux'

import getDisplayName from './getDisplayName'
import createIdentifier from './createIdentifier'
import createMapStateToProps from './createMapStateToProps'
import createIdentifiedActionCreators from './createIdentifiedActionCreators'
import defaultConventionalConfig from './defaultConventionalConfig'

type ConventionalActionCreators = {
  [actionName: string]: ActionCreator<LifecycleActions | Action<*, *>>
}
type WithLogic = (TemplateComponent: ComponentType<*>) => ComponentType<*>

type ConventionalConfig = {
  actions: ConventionalActionCreators,
  withLogic: WithLogic,
  Template: ComponentType<*>,
  reducer: Reducer<*, *>,
  REDUCER_NAME?: ReducerName,
  COMPONENT_NAME?: ComponentName,
  COMPONENT_KEY?: ComponentKey
}

function asConnectedComponent(conventionalConfig: ConventionalConfig) {
  if (!connect || !bindActionCreators) {
    throw new Error(
      'conventional-component#asConnectedComponent() cannot be used unless react-redux and redux are installed.'
    )
  }

  const {
    actions,
    withLogic,
    Template,
    REDUCER_NAME,
    COMPONENT_NAME,
    COMPONENT_KEY
  } = defaultConventionalConfig(conventionalConfig)

  const identifier = createIdentifier(COMPONENT_NAME, COMPONENT_KEY)

  const identifiedActions = createIdentifiedActionCreators(identifier, actions)

  const mapStateToProps = createMapStateToProps(REDUCER_NAME, identifier)

  function createMapDispatchToProps() {
    return (dispatch, props) => {
      return bindActionCreators(identifiedActions(props), dispatch)
    }
  }

  const ConnectedComponent = connect(mapStateToProps, createMapDispatchToProps)(
    withLogic(Template)
  )

  ConnectedComponent.displayName = `Connected${COMPONENT_NAME}`

  return ConnectedComponent
}

export type { ConventionalConfig }
export default asConnectedComponent
