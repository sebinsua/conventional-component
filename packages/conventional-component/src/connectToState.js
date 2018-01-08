// @flow

import type { ComponentType } from 'react'
import type { Action, ActionCreator } from './actions'
import type { Reducer } from './defaultConventionalConfig'

import { createFactory, Component } from 'react'
import getDisplayName from './getDisplayName'

import {
  INIT,
  RECEIVE_NEXT_PROPS,
  init,
  receiveNextProps,
  destroy
} from './actions'

type ComponentActions = { [actionCreatorKey: string]: ActionCreator<*> }

type State = { [key: string]: ?any }
type InitialState = State

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
) => (BaseComponent: ComponentType<*>) => {
  const factory = createFactory(BaseComponent)
  class ConnectToState extends Component<*, *> {
    state = reducer(initialState, { type: undefined })

    isControlledProp = (key: string): boolean => {
      return this.props[key] !== undefined
    }

    getState = (state: State | void = this.state) => {
      const stateToMerge = state || {}
      return Object.keys(stateToMerge).reduce((partialState, key) => {
        partialState[key] =
          this.isControlledProp(key) && this.props[key] !== stateToMerge[key]
            ? this.props[key]
            : stateToMerge[key]
        return partialState
      }, {})
    }

    dispatch = (action: Action<*, *>) => {
      const hasOnChange = typeof this.props.onChange === 'function'
      const isPropChange =
        action.type === INIT || action.type === RECEIVE_NEXT_PROPS

      this.setState(state => {
        const newState = reducer(this.getState(state), action)

        // Ensure that we do not send out the props that were just passed in.
        if (hasOnChange && isPropChange === false) {
          this.props.onChange(newState)
        }

        return newState
      })
    }

    actionCreators = bindActionCreators(
      { ...actionCreators, init, receiveNextProps, destroy },
      this.dispatch
    )

    render() {
      return factory({
        ...this.state,
        ...this.props,
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

export type { InitialState }
export default connectToState
