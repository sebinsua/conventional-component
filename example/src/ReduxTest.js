import React from 'react'
import { compose } from 'recompose'
import { bindActionCreators, createStore, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'
import {
  withReducerIdentity,
  withMapStateToPropsIdentity,
  bindIdentityToActionCreators
} from 'conventional-component'

import {
  actions as counterActions,
  reducer as counterReducer,
  withLogic as withCounterLogic,
  Template as CounterTemplate,
  REDUCER_NAME as counterReducerName
} from './Counter'
import {
  actions as inputActions,
  reducer as inputReducer,
  withLogic as withInputLogic,
  Template as InputTemplate,
  REDUCER_NAME as inputReducerName
} from './Input'

const store = createStore(
  combineReducers({
    [counterReducerName]: withReducerIdentity(counterReducer, identity =>
      identity.startsWith('Counter')
    ),
    [inputReducerName]: withReducerIdentity(inputReducer, identity =>
      identity.startsWith('Input')
    )
  }),
  {},
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const counterIdentifier = ({ id }) => `Counter/${id}`

function createCounterMapDispatchToProps() {
  return (dispatch, props) => {
    return bindActionCreators(
      bindIdentityToActionCreators(counterActions, props, counterIdentifier),
      dispatch
    )
  }
}

const Counter = compose(
  connect(
    withMapStateToPropsIdentity(counterReducerName, counterIdentifier),
    createCounterMapDispatchToProps
  ),
  withCounterLogic
)(CounterTemplate)

const inputIdentifier = ({ name }) => `Input/${name}`

function createInputMapDispatchToProps() {
  return (dispatch, props) => {
    return bindActionCreators(
      bindIdentityToActionCreators(inputActions, props, inputIdentifier),
      dispatch
    )
  }
}

const Input = compose(
  connect(
    withMapStateToPropsIdentity(inputReducerName, inputIdentifier),
    createInputMapDispatchToProps
  ),
  withInputLogic
)(InputTemplate)

const ReduxTest = () => (
  <Provider store={store}>
    <div className="App-redux">
      <Counter id="3" />
      <Counter id="4" />
      <Input name="input-name-3" />
      <Input name="input-name-4" />
    </div>
  </Provider>
)

export default ReduxTest
