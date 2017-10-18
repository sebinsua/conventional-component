import getDisplayName from './getDisplayName'
import defaultIdentifier from './defaultIdentifier'

const identity = v => v

const defaultEmptyObject = {}

function withMapStateToPropsIdentity(
  reducerName,
  identifier = defaultIdentifier,
  structuredSelector = identity
) {
  function withIdentity(state, ownProps) {
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

export default withActionIdentity
