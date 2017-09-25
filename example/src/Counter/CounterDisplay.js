import React from 'react'

const CounterDisplay = ({ count, increment }) => (
  <div onClick={increment}>count: {count}</div>
)

export default CounterDisplay
