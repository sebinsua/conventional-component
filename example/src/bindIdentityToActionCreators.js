import getDisplayName from './getDisplayName'
import defaultIdentifier from './defaultIdentifier'

const bindIdentityToActionCreator = identity => actionCreator => {
  const fn = (...args) => actionCreator(identity, ...args)

  fn.displayName = getDisplayName(actionCreator, 'AnonymousBoundActionCreator')

  return fn
}

const bindIdentityToActionCreators = (
  actions,
  props = {},
  identifier = defaultIdentifier,
) => {
  const bind = bindIdentityToActionCreator(
    identifier(props)
  )

  const actionCreatorKeys = Object.keys(actions).filter(
    actionCreatorKey => typeof actions[actionCreatorKey] === 'function'
  )
  return actionCreatorKeys.reduce((boundActionCreators, actionCreatorKey) => {
    const boundActionCreator = bind(actions[actionCreatorKey])
    return {
      ...boundActionCreators,
      [actionCreatorKey]: boundActionCreator
  }, {})
}

// function createMapDispatchToProps() {
//   return (dispatch, props) => {
//     return bindActionCreators(
//       bindIdentityToActionCreators(actions, props),
//       dispatch
//     )
//   }
// }

export { bindIdentityToActionCreator }
export default bindIdentityToActionCreators
