import { createStore, combineReducers } from 'redux'

import {
  reducer as counterReducer,
  REDUCER_NAME as counterReducerName
} from './Counter'
import {
  reducer as inputReducer,
  REDUCER_NAME as inputReducerName
} from './Input'

const identity = f => f

const rootReducer = combineReducers({
  [counterReducerName]: counterReducer,
  [inputReducerName]: inputReducer
})

const store = createStore(
  rootReducer,
  {},
  window.devToolsExtension ? window.devToolsExtension() : identity
)

export default store
