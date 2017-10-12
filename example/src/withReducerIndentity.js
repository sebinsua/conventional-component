import getDisplayName from './getDisplayName'

function withReducerIdentity(identifiedReducer) {
  function withIdentity(state, action) {
    const { identity } = action
    return {
      ...state,
      [identity]: identifiedReducer(state, action)
    }
  }

  const reducerName = getDisplayName(identifiedReducer, 'identifiedReducer')
  withIdentity.displayName = `withIdentity(${reducerName})`

  return withIdentity
}

export default withReducerIdentity
