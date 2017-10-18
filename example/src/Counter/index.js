import Counter from './Counter'
import Template from './CounterDisplay'
import withLogic from './withLogic'
import reducer, { REDUCER_NAME } from './reducer'
import * as actions from './actions'

export { actions, reducer, withLogic, Template, REDUCER_NAME }
export default Counter
