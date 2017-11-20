// @flow

import type { ActionCreator } from './types'
import type { Identifier, IdentifierProps } from './createIdentifier'

import getDisplayName from './getDisplayName'
import defaultIdentifier from './defaultIdentifier'

import { init, receiveNextProps, destroy } from './actions'

const defaultEmptyObject = {}

const bindIdentityToActionCreator = (identity: string) => (
  actionCreator: ActionCreator<*>
) => {
  const fn = (...args: Array<any>) => actionCreator(identity, ...args)

  fn.displayName = getDisplayName(actionCreator, 'AnonymousBoundActionCreator')

  return fn
}

const createIdentifiedActionCreators = (
  identifier: Identifier = defaultIdentifier,
  componentActions: { [actionCreatorKey: string]: ActionCreator<*> }
) => {
  const actions = { ...componentActions, init, receiveNextProps, destroy }
  return (props: IdentifierProps = defaultEmptyObject) => {
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
