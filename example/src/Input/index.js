import { compose, withHandlers } from 'recompose'
import receiveChildrenAsFunction from '../receiveChildrenAsFunction'
import connectState from '../connectState'
import reducer from './reducer'
import * as actions from './actions'

import InputDisplay from './InputDisplay'

const enhance = compose(
  connectState(reducer, actions),
  withHandlers({
    onBlur: props => event => {
      event.preventDefault()
      props.setFocus(false)
    },
    onChange: props => event => {
      event.preventDefault()
      props.setValue(event.target.value)
    },
    onFocus: props => event => {
      event.preventDefault()
      props.setFocus(true)
    },
    reset: props => () => {
      props.setValue('')
    }
  })
)

const InputLogic = enhance(receiveChildrenAsFunction)

const Input = enhance(InputDisplay)

export { InputLogic, InputDisplay }
export default Input
