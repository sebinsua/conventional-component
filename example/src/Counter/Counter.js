import { compose } from 'recompose'
import { connectToState } from 'conventional-component'

import CounterDisplay from './CounterDisplay'
import withLogic from './withLogic'
import reducer from './reducer'
import * as actions from './actions'

const COMPONENT_NAME = 'Counter'
const COMPONENT_KEY = 'id'

const enhance = compose(connectToState(reducer, actions), withLogic)

const Counter = enhance(CounterDisplay)

export { COMPONENT_NAME, COMPONENT_KEY }
export default Counter
