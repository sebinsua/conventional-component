import { compose, withHandlers } from 'recompose'
import connectToState from '../connectToState'

import CounterDisplay from './CounterDisplay'
import reducer from './reducer'
import * as actions from './actions'

const enhance = compose(
  connectToState(reducer, actions),
  withHandlers({
    increment: props => event => {
      event.preventDefault()
      props.increment()
    }
  })
)

const Counter = enhance(CounterDisplay)

export default Counter
