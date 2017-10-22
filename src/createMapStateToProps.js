// @flow

import type { Identifier } from './createIdentifier'

import getDisplayName from './getDisplayName'
import defaultIdentifier from './defaultIdentifier'

const identity = v => v

const defaultEmptyObject = {}

function createMapStateToProps<
  State: { [key: string]: ?any },
  OwnProps: { [key: string]: ?any }
>(
  reducerName: string,
  identifier: Identifier = defaultIdentifier,
  structuredSelector: Function = identity
) {
  function withIdentity(state: State, ownProps: OwnProps) {
    const reducerState = state[reducerName] || defaultEmptyObject
    const identity = identifier(ownProps)
    return structuredSelector(
      reducerState[identity] || defaultEmptyObject,
      ownProps
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const structuredSelectorName = getDisplayName(
      structuredSelector,
      'actionCreator'
    )
    withIdentity.displayName = `withIdentity(${structuredSelectorName})`
  }

  return withIdentity
}

export default createMapStateToProps
