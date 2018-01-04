import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import {
  receiveChildrenAsFunction,
  withLifecycleStateLogic
} from 'conventional-component'

import StateControlDisplay from './StateControlDisplay'

const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38
}

const toInputClassName = state => `StateControl__input-${state.value}`

const createStates = (availableStates = []) => {
  return availableStates.map(availableState => ({
    ...availableState,
    inputClassName: toInputClassName(availableState)
  }))
}

// TODO: Should be able to move around focus without altering the value.
//       Lets refactor the reducer to make this easier to do.

function withLogic(Template = StateControlDisplay) {
  class StateControl extends Component {
    componentDidMount() {
      // TODO: Use a ref approach to this.
      this.container = findDOMNode(this) // DO NOT USE THIS, INSTEAD WRAP OUR RENDER WITH A DIV.

      // TODO: Create an abstraction to simplify this...
      document.addEventListener('keydown', event => {
        if (this.container.contains(document.activeElement)) {
          switch (event.keyCode) {
            case KEYCODE.DOWN:
            case KEYCODE.LEFT:
              return this.previousValue(event)
            case KEYCODE.UP:
            case KEYCODE.RIGHT:
              return this.nextValue(event)
            default:
              break
          }
        }
      })
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.value && nextProps.value !== this.props.value) {
        const el = (document.getElementsByClassName(
          toInputClassName({ value: nextProps.value })
        ) || [])[0]
        if (el) {
          requestAnimationFrame(() => el.focus())
        }
      }
    }

    resetValue = event => {
      event.preventDefault()
      return this.props.setValue(this.props.defaultValue)
    }

    setValue = (value, event) => {
      event.preventDefault()
      this.props.setValue(value)
    }

    previousValue = event => {
      event.preventDefault()
      this.props.previousValue()
    }

    nextValue = event => {
      event.preventDefault()
      this.props.nextValue()
    }

    render() {
      const templateProps = {
        states: createStates(this.props.availableStates),
        currentValue: this.props.value,

        resetValue: this.resetValue,
        setValue: this.setValue,
        previousValue: this.previousValue,
        nextValue: this.nextValue
      }

      if (typeof this.props.children === 'function') {
        return receiveChildrenAsFunction(templateProps)
      }

      if (Template) {
        return <Template {...templateProps} />
      }

      return null
    }
  }

  return withLifecycleStateLogic({
    shouldDispatchReceiveNextProps: false
  })(StateControl)
}

export default withLogic
