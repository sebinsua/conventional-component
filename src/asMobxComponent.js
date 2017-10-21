import { createFactory, Component } from 'react'

import { observable, extendObservable, observer } from './redux'

import getDisplayName from './getDisplayName'
import createIdentifier from './createIdentifier'
import createIdentifiedActionCreators from './createIdentifiedActionCreators'

const DEFAULT_COMPONENT_KEY = 'id'

const bindActionCreator = dispatch => actionCreator => {
  const fn = (...args) => dispatch(actionCreator(...args))

  fn.displayName = getDisplayName(actionCreator, 'AnonymousBoundActionCreator')

  return fn
}

const bindActionCreators = (actions = {}, dispatch) => {
  const bind = bindActionCreator(dispatch)
  const actionCreatorKeys = Object.keys(actions).filter(
    actionCreatorKey => typeof actions[actionCreatorKey] === 'function'
  )
  return actionCreatorKeys.reduce((boundActionCreators, actionCreatorKey) => {
    const boundActionCreator = bind(actions[actionCreatorKey])
    return {
      ...boundActionCreators,
      [actionCreatorKey]: boundActionCreator
    }
  }, {})
}

const connectToState = (reducer, actionCreators) => BaseComponent => {
  const factory = createFactory(BaseComponent)
  class ConnectToState extends Component {
    state = reducer(undefined, init(undefined, this.props))

    dispatch = action => this.setState(state => reducer(state, action))

    actionCreators = bindActionCreators(
      { ...actionCreators, init, receiveNextProps, destroy },
      this.dispatch
    )

    render() {
      return factory({
        ...this.props,
        ...this.state,
        ...this.actionCreators,
        dispatch: this.dispatch
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const componentName = getDisplayName(BaseComponent, 'Component')
    ConnectToState.displayName = `connectToState(${componentName})`
  }

  return ConnectToState
}

function asMobxComponent(
  {
    actions,
    withLogic,
    Template,
    reducer,
    REDUCER_NAME,
    COMPONENT_NAME = getDisplayName(Template),
    COMPONENT_KEY = DEFAULT_COMPONENT_KEY
  } = {}
) {
  if (!observable || !extendObservable || !observer) {
    throw new Error(
      'conventional-component#asMobxComponent() cannot be used unless mobx and mobx-react are installed.'
    )
  }

  if (!actions || typeof actions !== 'object') {
    throw new Error(
      'conventional-component#asMobxComponent() should be passed an `actions` object containing action creators.'
    )
  }

  if (!reducer || typeof reducer !== 'function') {
    throw new Error(
      'conventional-component#asMobxComponent() should be passed a `reducer()` reducer.'
    )
  }

  if (!withLogic || typeof withLogic !== 'function') {
    throw new Error(
      'conventional-component#asMobxComponent() should be passed a `withLogic()` higher-order component.'
    )
  }

  if (!Template || typeof Template !== 'function') {
    throw new Error(
      'conventional-component#asMobxComponent() should be passed a `Template` component.'
    )
  }

  if (!REDUCER_NAME || typeof REDUCER_NAME !== 'string') {
    throw new Error(
      'conventional-component#asMobxComponent() should be passed the `REDUCER_NAME` key that contains the state.'
    )
  }

  const identifier = createIdentifier(COMPONENT_NAME, COMPONENT_KEY)

  const identifiedActions = createIdentifiedActionCreators(identifier, actions)

  function createMapDispatchToProps() {
    return (dispatch, props) => {
      return bindActionCreators(identifiedActions(props), dispatch)
    }
  }

  // TODO: What do I need to do?
  // 0. Read `connectToState`.
  // 1. Create an observable with the original state.
  // 2. Create the dispatch.
  // 3. Create the `identifiedActions(props)` from `this.dispatch` and pass them into render, alongside the props.

  // TODO: Use `createIdentifiedActionCreators` first.
  // TODO: Create my own fake `dispatch`.

  const LogicComponent = withLogic(Template)
  const ConnectedComponent = observer(LogicComponent)

  ConnectedComponent.displayName = `Connected${COMPONENT_NAME}`

  return ConnectedComponent
}

export default asMobxComponent
