// @flow

export type { ComponentActions } from './createIdentifiedActionCreators'
export type { Identifier, IdentifierProps } from './createIdentifier'
export type {
  WithIdentityState,
  IdentifierPredicate,
  Reducer
} from './withReducerIdentity'

import createIdentifier from './createIdentifier'
import createIdentifiedActionCreators from './createIdentifiedActionCreators'
import createMapStateToProps from './createMapStateToProps'
import withReducerIdentity from './withReducerIdentity'

export {
  asConnectedComponent,
  createIdentifier,
  createIdentifiedActionCreators,
  createMapStateToProps,
  withReducerIdentity
}
export default asConnectedComponent
