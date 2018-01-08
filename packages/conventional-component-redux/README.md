# `conventional-component-redux`
> 🏴 React components which can have their state hoisted into Redux.

## Example

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
yarn add conventional-component-redux
```

## API

#### `asConnectedComponent(conventionalComponentConfiguration) => ConnectedComponent`

To generate a redux `ConnectedComponent` you just pass in the named exports of your conventional component.

The functions defined below are [used internally by this to ensure that there is a mapping](https://github.com/sebinsua/conventional-component/blob/master/src/asConnectedComponent.js) between a particular copy of the Component and its state.

###### `createIdentifier(componentName, componentKey)`

###### `createIdentifiedActionCreators(identifier, actionCreators) => Props => IdentifiedActionCreators`

###### `createMapStateToProps(reducerName, identifier, structuredSelector)`

#### `withReducerIdentity(identifierPredicate, identifiedReducer) => IdentifiedReducer`

As we need to be able to store the state of more than one copy of a particular component at a time, we need to make sure that the reducer which was previously written for a singular component is wrapped to understand the `identity` property of our actions. We pass this reducer in as the second argument (e.g. `identifiedReducer`).

Since many actions could contain an `identity` property, we also need to make sure that we don't call the reducer unless the `identity` matches a predicate. Therefore the first argument (e.g. `identifierPredicate`) should either be the name of the component (e.g. `COMPONENT_NAME`) or a predicate function that returns a boolean.
