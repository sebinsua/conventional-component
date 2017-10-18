import { compose } from 'recompose'
import connectToState from '../connectToState'

import InputDisplay from './InputDisplay'
import withLogic from './withLogic'
import reducer from './reducer'
import * as actions from './actions'

const enhance = compose(connectToState(reducer, actions), withLogic)

const Input = enhance(InputDisplay)

export default Input
