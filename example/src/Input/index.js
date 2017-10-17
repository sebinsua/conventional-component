import React, { Component } from 'react'
import receiveChildrenAsFunction from '../receiveChildrenAsFunction'
import connectState from '../connectState'

import reducer from './reducer'
import * as actions from './actions'
import InputDisplay from './InputDisplay'

const enhance = connectState(reducer, actions)

function create(DefaultTemplate) {
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
        onBlur: this.onBlur,
        onChange: this.onChange,
        onFocus: this.onFocus,
        reset: this.reset,
        ...this.props
      }

      if (DefaultTemplate) {
        return <DefaultTemplate {...templateProps} />
      }

      return receiveChildrenAsFunction(templateProps)
    }
  }

  return Input
}

const InputLogic = enhance(create())

const Input = enhance(create(InputDisplay))

export { InputLogic, InputDisplay }
export default Input
