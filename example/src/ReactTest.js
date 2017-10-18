import React from 'react'

import Counter from './Counter'
import Input, { Template as InputTemplate } from './Input'

const ReactTest = () => (
  <div className="App-react">
    <Counter id="1" />
    <Input name="input-name-1" />
    <Input name="input-name-2">{InputTemplate}</Input>
  </div>
)

export default ReactTest
