# `conventional-component` [![Build Status](https://travis-ci.org/sebinsua/conventional-component.png)](https://travis-ci.org/sebinsua/conventional-component) [![npm version](https://badge.fury.io/js/conventional-component.svg)](https://www.npmjs.com/package/conventional-component)
> 🏴 React components which can have their state hoisted into Redux.

As I search for components with which to build an application, I frequently find otherwise excellent components which have inaccessible state. Often this means complications when integrating with Redux, due to how the state is passed in and emitted. Sometimes I will try to find a `react-redux-` variant of a component, however these unfortunately lose the ease of integration of plain React components.

This is a proposal to build components out of reducers and actions and a library to help do so. The intention is to make it easy to write standardised components which (1) can be quickly installed into an app, and (2) can have their state hoisted into Redux if the rest of the app needs to consume it.

It's loosely inspired on the conventions within [`erikras/ducks-modular-redux`](https://github.com/erikras/ducks-modular-redux).

## Convention

```js
export { actions, reducer, withLogic, Template, REDUCER_NAME }
export default Component
```

### Rules

A `Component`...

1. **MUST** `export default` itself.
    1. **MUST** store its state using `connectToState(reducer, actions)`.
    2. **MUST** dispatch an `init(props)` action on either construction or `componentWillMount`.
2. **MUST** `export` its action creator functions as `actions`.
    1. **MUST** wrap each of its actions with `withActionIdentity(actionCreator)`.
3. **MUST** `export` its reducer as `reducer(state, action)`.
    1. **MAY** `export` the default name for its reducer as `REDUCER_NAME`.
4. **MUST** `export` its component logic as a higher-order component `withLogic(Template)`.
5. **MUST** `export` its component template as `Template`.

## Example

### Component

The best way to understand the convention is to read [some example code for an `Input` component](./tree/master/src/Input).

```js
import Input from './Input'
import Template from './InputDisplay'
import withLogic from './withLogic'
import reducer, { REDUCER_NAME } from './reducer'
import * as actions from './actions'

export { actions, reducer, withLogic, Template, REDUCER_NAME }
export default Input
```

### Redux

The best way to understand how the state can be hoisted into Redux is to read [some example code in which this is done (`ReduxTest`)](./blob/master/example/src/ReduxTest.js).

```js
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
  actions as inputActions,
  reducer as inputReducer,
  withLogic as withInputLogic,
  Template as InputTemplate,
  REDUCER_NAME as inputReducerName
} from './Input'

const store = createStore(
  combineReducers({
    [inputReducerName]: withReducerIdentity(inputReducer, identity =>
      identity.startsWith('Input')
    )
  }),
  {},
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

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
      <Input name="input-name-3" />
      <Input name="input-name-4" />
    </div>
  </Provider>
)

export default ReduxTest
```

## API

### Component

#### `init(props)`

#### `connectToState(reducer, actions)`

#### `withActionIdentity(actionCreator)`

#### `receiveChildrenAsFunction(props)`

### Redux

#### `withReducerIdentity(identifiedReducer, identifierPredicate)`

#### `bindIdentityToActionCreators(actionCreators)`

#### `withMapStateToPropsIdentity(reducerName, identifier, structuredSelector)`

## Install

```sh
yarn add conventional-component
```
