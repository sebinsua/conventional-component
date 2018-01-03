import React from 'react'

import Counter from '../Counter'
import Input, { Template as InputTemplate } from '../Input'
import StateControl from '../StateControl'

const ReactTest = () => (
  <div className="App-react">
    <Counter id="1" />
    <Input name="input-name-1" />
    <Input name="input-name-2">{InputTemplate}</Input>
    <StateControl
      availableStates={[
        { value: '<S', settable: false },
        { value: 'S' },
        { value: 'S<M', settable: false },
        { value: 'M' },
        { value: 'M<F', settable: false },
        { value: 'F' },
        { value: '>F', settable: false }
      ]}
      defaultValue="M"
    />
  </div>
)

export default ReactTest
