import { compose, withHandlers } from 'recompose'
import receiveChildrenAsFunction from '../receiveChildrenAsFunction'
import connectState from '../connectState'
import reducer from './reducer'
import * as actions from './actions'

import InputDisplay from './InputDisplay'

// const defaultIdentifier = ({ id }) => id
// `${getDisplayName(Component, 'Component')}/${identitifier(props)}`

const enhance = compose(
  connectState(reducer, actions),
  withHandlers({
    onFocus: props => event => {
      event.preventDefault()
      props.setFocus(true)
    },
    onBlur: props => event => {
      event.preventDefault()
      props.setFocus(false)
    }
  })
)

const InputLogic = enhance(receiveChildrenAsFunction)

const Input = enhance(InputDisplay)

export { InputLogic, InputDisplay }
export default Input
