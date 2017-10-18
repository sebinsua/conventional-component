import { init, INIT } from './actions'
import bindIdentityToActionCreators from './bindIdentityToActionCreators'
import connectToState from './connectToState'
import receiveChildrenAsFunction from './receiveChildrenAsFunction'
import withActionIdentity from './withActionIdentity'
import withMapStateToPropsIdentity from './withMapStateToPropsIdentity'
import withReducerIdentity from './withReducerIdentity'

export {
  init,
  INIT,
  bindIdentityToActionCreators,
  connectToState,
  receiveChildrenAsFunction,
  withActionIdentity,
  withMapStateToPropsIdentity,
  withReducerIdentity
}
export default connectToState
