import getDisplayName from './getDisplayName'
import defaultIdentifier from './defaultIdentifier'

import { init, receiveNextProps, destroy } from './actions'

const defaultEmptyObject = {}

const bindIdentityToActionCreator = identity => actionCreator => {
  const fn = (...args) => actionCreator(identity, ...args)

  fn.displayName = getDisplayName(actionCreator, 'AnonymousBoundActionCreator')

  return fn
}

const createIdentifiedActionCreators = (
  identifier = defaultIdentifier,
  componentActions
) => {
  const actions = { ...componentActions, init, receiveNextProps, destroy }
  return (props = defaultEmptyObject) => {
    const bind = bindIdentityToActionCreator(identifier(props))

    const actionCreatorKeys = Object.keys(actions).filter(
      actionCreatorKey => typeof actions[actionCreatorKey] === 'function'
    )
    return actionCreatorKeys.reduce((boundActionCreators, actionCreatorKey) => {
      const boundActionCreator = bind(actions[actionCreatorKey])
      return {
        ...boundActionCreators,
        [actionCreatorKey]: boundActionCreator
      }
    }, {})
  }
}

export { bindIdentityToActionCreator }
export default createIdentifiedActionCreators
