# `conventional-component`
> 🏴 React components which can have their state hoisted into Redux.

## Example

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
  withRenderProp,
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

      if (
        typeof this.props.render === 'function' ||
        typeof this.props.children === 'function'
      ) {
        return withRenderProp(templateProps)
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

## Install

```sh
yarn add conventional-component
```

## API

#### `connectToState(reducer, actionCreators) => Component => ConnectedComponent`

This function allows a `reducer` to be used in place of [standard `this.setState`](https://reactjs.org/docs/react-component.html#setstate) calls. It passes through the reducer state and the actions into a component.

It's implemented as a higher-order component (HOC) and therefore returns a function which takes a `Component`. In fact it might look familiar as it is an analogue to [`react-redux#connect(mapStateToProps, actions)`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options), however with first argument being a standard redux [`reducer`](http://redux.js.org/docs/basics/Reducers.html) and the second argument being an object of identity-receiving action creators (these could possibly have been created by wrapping normal action creators with `withActionIdentity`).

#### `withLifecycleStateLogic({ shouldDispatchReceiveNextProps }) => LogicComponent => LifecycleLogicComponent`

This higher-order component (HOC) is provided to help dispatch the correct lifecycle
actions (e.g. `init` and `destroy` when a component is added or removed from the screen.)

It should be used within `withLogic` to wrap any other component logic.

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

#### `withRenderProp(props)`

This is just a helper to improve the readability of [the render prop and function-as-a-child patterns](http://mxstbr.blog/2017/02/react-children-deepdive/#function-as-a-child).
