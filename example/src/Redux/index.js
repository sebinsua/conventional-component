import React from 'react'
import { Provider } from 'react-redux'

import store from './store'

import Counter from './Counter'
import Input from './Input'

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
