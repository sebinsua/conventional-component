import getDisplayName from './getDisplayName'

import { INIT, DESTROY } from './actions'

const without = (arr = [], value) => {
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

const createDefaultIdentifierPredicate = componentName => identity =>
  identity.startsWith(componentName)

function withReducerIdentity(identifierPredicate, identifiedReducer) {
  if (typeof identifierPredicate === 'string') {
    identifierPredicate = createDefaultIdentifierPredicate(identifierPredicate)
  }

  function withIdentity(state = initialState, action) {
    const identities = action.identity
      ? defaultEmptyArray.concat(action.identity)
      : defaultEmptyArray

    const mountedIdentities = state.mountedIdentities

    if (identities.length > 0) {
      return identities.reduce(
        (newState, identity) => {
          if (!identifierPredicate(identity)) {
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

export { initialState }
export default withReducerIdentity
