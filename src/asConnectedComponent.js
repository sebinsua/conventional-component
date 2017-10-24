import { connect, bindActionCreators } from './redux'

import getDisplayName from './getDisplayName'
import createIdentifier from './createIdentifier'
import createMapStateToProps from './createMapStateToProps'
import createIdentifiedActionCreators from './createIdentifiedActionCreators'

const DEFAULT_COMPONENT_KEY = 'id'

function asConnectedComponent(
  {
    actions,
    withLogic,
    Template,
    reducer,
    REDUCER_NAME = getDisplayName(reducer),
    COMPONENT_NAME = getDisplayName(Template),
    COMPONENT_KEY = DEFAULT_COMPONENT_KEY
  } = {}
) {
  if (!connect || !bindActionCreators) {
    throw new Error(
      'conventional-component#asConnectedComponent() cannot be used unless react-redux and redux are installed.'
    )
  }

  if (!actions || typeof actions !== 'object') {
    throw new Error(
      'conventional-component#asConnectedComponent() should be passed an `actions` object containing action creators.'
    )
  }

  if (!withLogic || typeof withLogic !== 'function') {
    throw new Error(
      'conventional-component#asConnectedComponent() should be passed a `withLogic()` higher-order component.'
    )
  }

  if (!Template || typeof Template !== 'function') {
    throw new Error(
      'conventional-component#asConnectedComponent() should be passed a `Template` component.'
    )
  }

  if (!REDUCER_NAME || typeof REDUCER_NAME !== 'string') {
    throw new Error(
      'conventional-component#asConnectedComponent() should be passed the `REDUCER_NAME` key that contains the state or given a reducer with a name.'
    )
  }

  const identifier = createIdentifier(COMPONENT_NAME, COMPONENT_KEY)

  const identifiedActions = createIdentifiedActionCreators(identifier, actions)

  const mapStateToProps = createMapStateToProps(REDUCER_NAME, identifier)

  function createMapDispatchToProps() {
    return (dispatch, props) => {
      return bindActionCreators(identifiedActions(props), dispatch)
    }
  }

  const ConnectedComponent = connect(mapStateToProps, createMapDispatchToProps)(
    withLogic(Template)
  )

  ConnectedComponent.displayName = `Connected${COMPONENT_NAME}`

  return ConnectedComponent
}

export default asConnectedComponent
