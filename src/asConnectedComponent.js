import { connect, bindActionCreators } from './redux'

import createIdentifier from './createIdentifier'
import createMapStateToProps from './createMapStateToProps'
import bindIdentityToActionCreators from './bindIdentityToActionCreators'

function asConnectedComponent({
  actions,
  withLogic,
  Template,
  REDUCER_NAME,
  COMPONENT_NAME,
  COMPONENT_KEY
}) {
  if (!connect || !bindActionCreators) {
    throw new Error(
      'conventional-component#asConnectedComponent() cannot be used unless react-redux and redux are installed.'
    )
  }

  const identifier = createIdentifier(COMPONENT_NAME, COMPONENT_KEY)

  const identifiedActions = bindIdentityToActionCreators(identifier, actions)

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
