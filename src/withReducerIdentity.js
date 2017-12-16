// @flow

import type { Identity, WithIdentity } from './withActionIdentity'

import getDisplayName from './getDisplayName'

import { INIT, DESTROY } from './actions'

type WithIdentityState<ReducerState> = {
  mountedIdentities: Array<Identity>,
  [key: Identity]: ?ReducerState
}

type IdentifierPredicate = (identity: Identity) => boolean

type Reducer<ReducerState, Actions> = (
  state: ReducerState,
  action: Actions
) => ReducerState

const without = (arr: Array<*> = [], value: *): Array<*> => {
  const idx = arr.indexOf(value)
  if (idx > -1) {
    return [...arr].splice(idx, 1)
  }
  return arr
}

const defaultEmptyArray = []

const initialState = {
  mountedIdentities: []
}

const createDefaultIdentifierPredicate = (
  componentName: string
): IdentifierPredicate => {
  return (identity: Identity): boolean => identity.startsWith(componentName)
}

function withReducerIdentity<ReducerState>(
  identifierPredicate: string | IdentifierPredicate,
  identifiedReducer: Reducer<ReducerState, *>
) {
  const identityMatches =
    typeof identifierPredicate === 'function'
      ? identifierPredicate
      : createDefaultIdentifierPredicate(identifierPredicate)

  function withIdentity(
    state: WithIdentityState<ReducerState> = initialState,
    action: WithIdentity<*>
  ): WithIdentityState<ReducerState> {
    const identities = action.identity
      ? defaultEmptyArray.concat(action.identity)
      : defaultEmptyArray

    const mountedIdentities = state.mountedIdentities

    if (identities.length > 0) {
      return identities.reduce(
        (newState, identity) => {
          if (!identityMatches(identity)) {
            return newState
          }

          if (action.type === DESTROY) {
            const amendedState = { ...newState }
            delete amendedState[identity]
            amendedState.mountedIdentities = without(
              identity,
              amendedState.mountedIdentities
            )
            return amendedState
          }

          let amendedMountedIdentities = mountedIdentities
          if (
            action.type === INIT &&
            mountedIdentities.includes(identity) === false
          ) {
            amendedMountedIdentities = [...mountedIdentities]
            amendedMountedIdentities.push(identity)
          }

          return {
            ...newState,
            [identity]: identifiedReducer(state[identity], action),
            mountedIdentities: amendedMountedIdentities
          }
        },
        { ...state }
      )
    }

    return state
  }

  if (process.env.NODE_ENV !== 'development') {
    const reducerName = getDisplayName(identifiedReducer, 'identifiedReducer')
    withIdentity.displayName = `withIdentity(${reducerName})`
  }

  return withIdentity
}

export type { WithIdentityState, IdentifierPredicate, Reducer }
export { initialState }
export default withReducerIdentity
