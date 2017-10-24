import { connect, bindActionCreators } from './redux'

import getDisplayName from './getDisplayName'
import createIdentifier from './createIdentifier'
import createMapStateToProps from './createMapStateToProps'
import createIdentifiedActionCreators from './createIdentifiedActionCreators'
import defaultConventionalConfig from './defaultConventionalConfig'

const DEFAULT_COMPONENT_KEY = 'id'

function asConnectedComponent(conventionalConfig) {
  if (!connect || !bindActionCreators) {
    throw new Error(
      'conventional-component#asConnectedComponent() cannot be used unless react-redux and redux are installed.'
    )
  }

  const {
    actions,
    withLogic,
    Template,
    REDUCER_NAME,
    COMPONENT_NAME,
    COMPONENT_KEY
  } = defaultConventionalConfig(conventionalConfig)

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
