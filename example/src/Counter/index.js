import { compose, withHandlers } from 'recompose'
import connectState from '../connectState'
import reducer from './reducer'
import { increment } from './actions'

import CounterDisplay from './CounterDisplay'

const enhance = compose(
  connectState(reducer, { increment }),
  withHandlers({
    increment: props => event => {
      event.preventDefault()
      console.log('props', props, 'event', event)
      props.increment()
    }
  })
)

const Counter = enhance(CounterDisplay)

export default Counter
