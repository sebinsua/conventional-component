import getDisplayName from './getDisplayName'

const defaultEmptyArray = []

const initialState = {}

const toFalse = identity => false

function withReducerIdentity(identifiedReducer, identifierPredicate = toFalse) {
  function withIdentity(state = initialState, action) {
    const identities = action.identity
      ? defaultEmptyArray.concat(action.identity)
      : defaultEmptyArray

    if (identities.length > 0) {
      return identities.reduce(
        (newState, identity) => {
          if (!identifierPredicate(identity)) {
            return newState
          }
          return {
            ...newState,
            [identity]: identifiedReducer(state[identity], action)
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

export default withReducerIdentity
