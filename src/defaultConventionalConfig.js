const defaultConventionalConfig = (
  {
    actions,
    withLogic,
    Template,
    reducer,
    REDUCER_NAME = getDisplayName(reducer),
    COMPONENT_NAME = getDisplayName(Template),
    COMPONENT_KEY = DEFAULT_COMPONENT_KEY
  } = {}
) => {
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

  return {
    actions,
    withLogic,
    Template,
    REDUCER_NAME,
    COMPONENT_NAME,
    COMPONENT_KEY
  }
}

export default defaultConventionalConfig
