import getDisplayName from './getDisplayName'

function withActionIdentity(actionCreator) {
  function withIdentity(identity, ...args) {
    return { identity, ...actionCreator(...args) }
  }

  const actionCreatorName = getDisplayName(actionCreator, 'actionCreator')
  withIdentity.displayName = `withIdentity(${actionCreatorName})`

  return withIdentity
}

export default withActionIdentity
