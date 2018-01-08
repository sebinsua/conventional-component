// @flow

// TODO: Make these both exports...
import type { ActionCreator } from 'conventional-component'
import type { Identifier, IdentifierProps } from './createIdentifier'

import { getDisplayName } from 'conventional-component'
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
  componentActions: ComponentActions
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

export type { ComponentActions }
export { bindIdentityToActionCreator }
export default createIdentifiedActionCreators
