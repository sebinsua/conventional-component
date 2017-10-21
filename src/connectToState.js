import { createFactory, Component } from 'react'
import getDisplayName from './getDisplayName'

import { init, receiveNextProps, destroy } from './actions'

const bindActionCreator = dispatch => actionCreator => {
  const fn = (...args) => dispatch(actionCreator(undefined, ...args))

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

export default connectToState
