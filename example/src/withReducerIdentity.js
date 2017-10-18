import getDisplayName from './getDisplayName'

const defaultEmptyArray = []

function withReducerIdentity(identifiedReducer) {
  function withIdentity(state, action) {
    const identities = action.identity
      ? defaultEmptyArray.concat(action.identity)
      : defaultEmptyArray

    if (identities.length > 0) {
      return identities.reduce(
        (newState, identity) => {
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
