import { compose, withHandlers } from 'recompose'
import connectState from '../connectState'
import reducer from './reducer'
import * as actions from './actions'

import CounterDisplay from './CounterDisplay'

const enhance = compose(
  connectState(reducer, actions),
  withHandlers({
    increment: props => event => {
      event.preventDefault()
      props.increment()
    }
  })
)

const Counter = enhance(CounterDisplay)

export default Counter
