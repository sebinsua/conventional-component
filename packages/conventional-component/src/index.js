// @flow

export type {
  Action,
  ActionCreator,
  Props,
  Init,
  NextProps,
  Destroy,
  LifecycleActions
} from './actions'
export type { ComponentActions } from './createIdentifiedActionCreators'
export type { InitialState } from './connectToState'
export type { Identifier, IdentifierProps } from './createIdentifier'
export type {
  ConventionalConfig,
  ConventionalActionCreators,
  WithLogic,
  ComponentName,
  ComponentKey,
  ReducerName
} from './defaultConventionalConfig'
export type { WithIdentity, Identity } from './withActionIdentity'
export type {
  LifecyleStateConfiguration,
  WithLifecycleStateLogicProps
} from './withLifecycleStateLogic'
export type {
  WithIdentityState,
  IdentifierPredicate,
  Reducer
} from './withReducerIdentity'

import {
  init,
  receiveNextProps,
  destroy,
  INIT,
  RECEIVE_NEXT_PROPS,
  DESTROY
} from './actions'
import createIdentifier from './createIdentifier'
import createIdentifiedActionCreators from './createIdentifiedActionCreators'
import connectToState from './connectToState'
import defaultConventionalConfig from './defaultConventionalConfig'
import getDisplayName from './getDisplayName'
import withRenderProp from './withRenderProp'
import withActionIdentity from './withActionIdentity'
import createMapStateToProps from './createMapStateToProps'
import withReducerIdentity from './withReducerIdentity'
import withLifecycleStateLogic from './withLifecycleStateLogic'

export {
  init,
  receiveNextProps,
  destroy,
  INIT,
  RECEIVE_NEXT_PROPS,
  DESTROY,
  createIdentifier,
  createIdentifiedActionCreators,
  connectToState,
  defaultConventionalConfig,
  getDisplayName,
  withRenderProp,
  withActionIdentity,
  createMapStateToProps,
  withReducerIdentity,
  withLifecycleStateLogic
}
export default connectToState
