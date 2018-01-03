import React, { Component } from 'react'
import {
  receiveChildrenAsFunction,
  withLifecycleStateLogic
} from 'conventional-component'

import StateControlDisplay from './StateControlDisplay'

function withLogic(Template = StateControlDisplay) {
  class StateControl extends Component {
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
        states: this.props.availableStates,
        currentValue: this.props.value,
        resetValue: this.props.resetValue,
        setValue: this.props.setValue,
        previousValue: this.props.previousValue,
        nextValue: this.props.nextValue
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
