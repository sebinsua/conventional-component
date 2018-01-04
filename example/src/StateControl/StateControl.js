import { compose } from 'recompose'
import { connectToState } from 'conventional-component'

import StateControlDisplay from './StateControlDisplay'
import withLogic from './withLogic'
import reducer from './reducer'
import * as actions from './actions'

const COMPONENT_NAME = 'StateControl'
const COMPONENT_KEY = 'name'

const enhance = compose(connectToState(reducer, actions), withLogic)

const StateControl = enhance(StateControlDisplay)

export { COMPONENT_NAME, COMPONENT_KEY }
export default StateControl
