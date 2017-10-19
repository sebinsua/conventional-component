import { init, INIT } from './actions'
import asConnectedComponent from './asConnectedComponent'
import createIdentifier from './createIdentifier'
import bindIdentityToActionCreators from './bindIdentityToActionCreators'
import connectToState from './connectToState'
import receiveChildrenAsFunction from './receiveChildrenAsFunction'
import withActionIdentity from './withActionIdentity'
import createMapStateToProps from './createMapStateToProps'
import withReducerIdentity from './withReducerIdentity'

export {
  init,
  INIT,
  asConnectedComponent,
  createIdentifier,
  bindIdentityToActionCreators,
  connectToState,
  receiveChildrenAsFunction,
  withActionIdentity,
  createMapStateToProps,
  withReducerIdentity
}
export default connectToState
