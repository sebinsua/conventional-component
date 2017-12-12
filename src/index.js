// @flow

import {
  init,
  receiveNextProps,
  destroy,
  INIT,
  RECEIVE_NEXT_PROPS,
  DESTROY
} from './actions'
import asConnectedComponent from './asConnectedComponent'
import createIdentifier from './createIdentifier'
import createIdentifiedActionCreators from './createIdentifiedActionCreators'
import connectToState from './connectToState'
import receiveChildrenAsFunction from './receiveChildrenAsFunction'
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
  asConnectedComponent,
  createIdentifier,
  createIdentifiedActionCreators,
  connectToState,
  receiveChildrenAsFunction,
  withActionIdentity,
  createMapStateToProps,
  withReducerIdentity,
  withLifecycleStateLogic
}
export default connectToState
