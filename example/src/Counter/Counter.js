import { compose } from 'recompose'
import connectToState from '../connectToState'

import CounterDisplay from './CounterDisplay'
import withLogic from './withLogic'
import reducer from './reducer'
import * as actions from './actions'

const enhance = compose(connectToState(reducer, actions), withLogic)

const Counter = enhance(CounterDisplay)

export default Counter
