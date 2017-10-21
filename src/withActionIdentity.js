import getDisplayName from './getDisplayName'

function withActionIdentity(actionCreator) {
  function withIdentity(identity, ...args) {
    if (identity) {
      const action = actionCreator(...args)
      if (typeof action !== 'object') {
        throw new Error(
          'conventional-component#withActionIdentity only supports action creators which create action objects. ' +
            'If you need to support thunks, you must conform to the conventional-component ' +
            'Action and ActionCreator signatures manually.'
        )
      }
      return { identity, ...action }
    }

    return actionCreator(...args)
  }

  if (process.env.NODE_ENV !== 'production') {
    const actionCreatorName = getDisplayName(actionCreator, 'actionCreator')
    withIdentity.displayName = `withIdentity(${actionCreatorName})`
  }

  return withIdentity
}

export default withActionIdentity
