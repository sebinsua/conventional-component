import getDisplayName from './getDisplayName'

function withActionIdentity(actionCreator) {
  function withIdentity(identity, ...args) {
    if (identity) {
      return { identity, ...actionCreator(...args) }
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
