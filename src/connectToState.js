// @flow

import type { Action } from './actions'
import type { ComponentActions } from './createIdentifiedActionCreators'
import type { Reducer } from './withReducerIdentity'

import { createFactory, Component } from 'react'
import getDisplayName from './getDisplayName'

import { init, receiveNextProps, destroy } from './actions'

type InitialState = { [key: string]: any }

const NO_IDENTITY: void = undefined

const bindActionCreator = dispatch => actionCreator => {
  const fn = (...args) => dispatch(actionCreator(NO_IDENTITY, ...args))

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

const connectToState = (
  reducer: Reducer<*, *>,
  actionCreators: ComponentActions,
  initialState: InitialState | void = undefined
) => (BaseComponent: Component<*, *>) => {
  // $FlowFixMe
  const factory = createFactory(BaseComponent)
  class ConnectToState extends Component<*, *> {
    state = reducer(initialState, init(NO_IDENTITY, this.props))

    dispatch = (action: Action<*>) =>
      this.setState(state => reducer(state, action))

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
