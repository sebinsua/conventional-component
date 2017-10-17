import React, { Component } from 'react'
import receiveChildrenAsFunction from '../receiveChildrenAsFunction'
import connectToState from '../connectToState'

import reducer from './reducer'
import * as actions from './actions'
import InputDisplay from './InputDisplay'

const enhance = connectToState(reducer, actions)

function createLogic(Template = InputDisplay) {
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

  return Input
}

const InputLogic = createLogic(InputDisplay);

const Input = enhance(InputLogic)

export {
  createLogic,
  enhance,
  InputLogic,
  InputDisplay
}
export default Input
