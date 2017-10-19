import { compose } from 'recompose'
import { connectToState } from 'conventional-component'

import InputDisplay from './InputDisplay'
import withLogic from './withLogic'
import reducer from './reducer'
import * as actions from './actions'

const COMPONENT_NAME = 'Input'
const COMPONENT_KEY = 'name'

const enhance = compose(connectToState(reducer, actions), withLogic)

const Input = enhance(InputDisplay)

export { COMPONENT_NAME, COMPONENT_KEY }
export default Input
