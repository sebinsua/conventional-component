import React, { Component } from 'react'
import {
  receiveChildrenAsFunction,
  withLifecycleStateLogic
} from 'conventional-component'

import InputDisplay from './InputDisplay'

function withLogic(Template = InputDisplay) {
  class Input extends Component {
    onBlur = event => {
      event.preventDefault()
      return this.props.setFocus(false)
    }

    onChange = event => {
      event.preventDefault()
      return this.props.setValue(event.target.value)
    }

    onFocus = event => {
      event.preventDefault()
      return this.props.setFocus(true)
    }

    reset = event => {
      event.preventDefault()
      return this.props.setValue('')
    }

    render() {
      const templateProps = {
        ...this.props,
        onBlur: this.onBlur,
        onChange: this.onChange,
        onFocus: this.onFocus,
        reset: this.reset
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
  })(Input)
}

export default withLogic
