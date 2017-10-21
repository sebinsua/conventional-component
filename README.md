# `conventional-component` [![Build Status](https://travis-ci.org/sebinsua/conventional-component.png)](https://travis-ci.org/sebinsua/conventional-component) [![npm version](https://badge.fury.io/js/conventional-component.svg)](https://www.npmjs.com/package/conventional-component)
> 🏴 React components which can have their state hoisted into Redux.

As I search for components with which to build an application, I frequently find otherwise excellent components which have inaccessible state. Often this means complications when integrating with Redux, due to how the state is passed in and emitted. Sometimes I will try to find a `react-redux-` variant of a component, however these unfortunately lose the ease of integration of plain React components.

This is a proposal to build components out of reducers and actions and a library to help do so. The intention is to make it easy to write standardised components which (1) can be quickly installed into an app, and (2) can have their state hoisted into Redux if the rest of the app needs to consume it.

It's loosely inspired from the conventions within [`erikras/ducks-modular-redux`](https://github.com/erikras/ducks-modular-redux). It also has some similarities to [`multireducer`](https://github.com/erikras/multireducer) however due to its use of convention it's decoupled from redux.

#### :warning: :construction_worker: :wrench: Ready-for-use yet WIP :hammer: :construction: :warning:

- [ ] **Feat**: TypeScript definitions.
- [ ] **Chore**: Flowtype definitions.
- [ ] **Chore**: Unit tests. *(NOTE: It's already usable as the code is working correctly within the [`example/src`](./example/src)).*

## Convention

```js
export {
  actions,
  reducer,
  withLogic,
  Template,
  REDUCER_NAME,
  COMPONENT_NAME,
  COMPONENT_KEY
}
export default Component
```

### Rules

A `Component`...

1. **MUST** `export default` itself.
    1. **MUST** `export` the name of the component as `COMPONENT_NAME`.
    2. **MUST** `export` the primary key of each of the components as `COMPONENT_KEY` (e.g. `id`, `name`).
2. **MUST** store its state using `connectToState(reducer, actions)`.
3. **MUST** `export` its component logic as a higher-order component (HOC) `withLogic(Template)`.
    1. **MUST** dispatch an `init(identity, props)` action on either construction or `componentWillMount`.
    2. **MAY** dispatch a `receiveNextProps(identity, props)` action on `componentWillReceiveProps`.
    3. **MUST** dispatch a `destroy(identity)` action on `componentWillUnmount`.
    4. **MAY** use the higher-order component (HOC) `withLifecycleStateLogic` to dispatch the lifecycle actions mentioned above.
    5. **MAY** implement `receiveChildrenAsFunction` in order to render a user-specified function-as-a-child and otherwise fallback to rendering the `Template`.
4. **MUST** `export` its action creator functions as `actions`.
    1. **MUST** either wrap each of its actions with `withActionIdentity(actionCreator)` or use action creators with the same signature.
5. **MUST** `export` its reducer as `reducer(state, action)`.
    1. **MAY** `export` the default name for its reducer as `REDUCER_NAME`.
6. **MUST** `export` its component template as `Template`.

## Example

### Component

The best way to understand the convention is to read [some example code for an `Input` component](./example/src/Input).

#### Index

```js
import Input, { COMPONENT_NAME, COMPONENT_KEY } from './Input'
import Template from './InputDisplay'
import withLogic from './withLogic'
import reducer, { REDUCER_NAME } from './reducer'
import * as actions from './actions'

export {
  actions,
  reducer,
  withLogic,
  Template,
  REDUCER_NAME,
  COMPONENT_NAME,
  COMPONENT_KEY
}
export default Input
```

#### `withLogic(Template)`

```js
import React, { Component } from 'react'
import {
  receiveChildrenAsFunction,
  withLifecycleStateLogic
} from 'conventional-component'

import InputDisplay from './InputDisplay'

function withLogic(Template = InputDisplay) {
  class Input extends Component {
    onBlur = event => {
      event.preventDefault()
      return this.props.setFocus(false)
    }

    onChange = event => {
      event.preventDefault()
      return this.props.setValue(event.target.value)
    }

    onFocus = event => {
      event.preventDefault()
      return this.props.setFocus(true)
    }

    reset = event => {
      event.preventDefault()
      return this.props.setValue('')
    }

    render() {
      const templateProps = {
        ...this.props,
        onBlur: this.onBlur,
        onChange: this.onChange,
        onFocus: this.onFocus,
        reset: this.reset
      }

      if (typeof this.props.children === 'function') {
        return receiveChildrenAsFunction(templateProps)
      }

      if (Template) {
        return <Template {...templateProps} />
      }

      return null
    }
  }

  return withLifecycleStateLogic({
    shouldDispatchReceiveNextProps: false
  })(Input)
}

export default withLogic
```

#### `Input`

```js
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
```

### Redux

The best way to understand how the state can be hoisted into Redux is to read [some example code in which this is done](./example/src/Redux).

#### Component

```js
import { asConnectedComponent } from 'conventional-component'

import {
  actions,
  withLogic,
  Template,
  REDUCER_NAME,
  COMPONENT_NAME,
  COMPONENT_KEY
} from '../../Input'

export default asConnectedComponent({
  actions,
  withLogic,
  Template,
  REDUCER_NAME,
  COMPONENT_NAME,
  COMPONENT_KEY
})
```

#### Reducer

```js
import { withReducerIdentity } from 'conventional-component'

import { reducer, COMPONENT_NAME, REDUCER_NAME } from '../../Input'

export { REDUCER_NAME }
export default withReducerIdentity(COMPONENT_NAME, reducer)
```

## Install

```sh
yarn add conventional-component
```

## API

### Component

#### `connectToState(reducer, actionCreators) => Component => ConnectedComponent`

This function allows a `reducer` to be used in place of [standard `this.setState`](https://reactjs.org/docs/react-component.html#setstate) calls. It passes through the reducer state and the actions into a component.

It's implemented as a higher-order component (HOC) and therefore returns a function which takes a `Component`. In fact it might look familiar as it is an analogue to [`react-redux#connect(mapStateToProps, actions)`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options), however with first argument being a standard redux [`reducer`](http://redux.js.org/docs/basics/Reducers.html) and the second argument being an object of identity-receiving action creators (these could possibly have been created by wrapping normal action creators with `withActionIdentity`).

#### `withLifecycleStateLogic({ shouldDispatchReceiveNextProps }) => LogicComponent => LifecycleLogicComponent`

This is provided to wrap the component logic defined within `withLogic` and to handle the dispatching of the lifecycle
actions (e.g. `init` and `destroy` when a component is added or removed from the screen.)

By default `shouldDispatchReceiveNextProps` is false.

###### `init(identity, props)`

This must be called by conventional components during either [the `constructor` or the `componentWillMount` lifecycle methods](https://reactjs.org/docs/react-component.html#constructor).

`INIT` is also exported alongside this.

###### `receiveNextProps(identity, props)`

This may be called by conventional components during [the `componentWillReceiveProps` lifecycle method](https://reactjs.org/docs/react-component.html#componentwillreceiveprops).

`RECEIVE_NEXT_PROPS` is also exported alongside this.

###### `destroy(identity)`

This must be called by conventional components during [the `componentWillUnmount` lifecycle method](https://reactjs.org/docs/react-component.html#componentwillunmount).

`DESTROY` is also exported alongside this.

#### `withActionIdentity(actionCreator) => IdentityReceivingActionCreator`

If we choose to store the state within a redux store, we need to make sure that we can identify the state of each component by a key. Therefore, we should ensure that all actions contain an `identity` property.

This is a helper which can be used to wrap normal action creators with this extra property. The first argument of these wrapped action creators is always the `identity` property.

If you are using thunked actions or need more control for whatever reason, you can just conform to this type signature yourself. All you need to do is make sure that the first argument of each of your action creators is `identity` and that the action which is returned contains this value within an `identity` property.

#### `receiveChildrenAsFunction(props)`

This is just a helper to improve the readability of [the function-as-a-child pattern](http://mxstbr.blog/2017/02/react-children-deepdive/#function-as-a-child).

### Redux

#### `asConnectedComponent(conventionalComponentConfiguration) => ConnectedComponent`

To generate a redux `ConnectedComponent` you just pass in the named exports of your conventional component.

The functions defined below are [used internally by this to ensure that there is a mapping](https://github.com/sebinsua/conventional-component/blob/master/src/asConnectedComponent.js) between a particular copy of the Component and its state.

###### `createIdentifier(componentName, componentKey)`

###### `createIdentifiedActionCreators(identifier, actionCreators) => Props => IdentifiedActionCreators`

###### `createMapStateToProps(reducerName, identifier, structuredSelector)`

#### `withReducerIdentity(identifierPredicate, identifiedReducer) => IdentifiedReducer`

As we need to be able to store the state of more than one copy of a particular component at a time, we need to make sure that the reducer which was previously written for a singular component is wrapped to understand the `identity` property of our actions. We pass this reducer in as the second argument (e.g. `identifiedReducer`).

Since many actions could contain an `identity` property, we also need to make sure that we don't call the reducer unless the `identity` matches a predicate. Therefore the first argument (e.g. `identifierPredicate`) should either be the name of the component (e.g. `COMPONENT_NAME`) or a predicate function that returns a boolean.
