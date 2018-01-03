import React from 'react'

const StateControlDisplay = ({
  states,
  currentValue,
  setValue,
  previousValue,
  nextValue
}) => (
  <div>
    <button onClick={previousValue}>{'<'}</button>
    {states.map((state, idx) => (
      <div
        key={`item-${idx}`}
        className={
          state.value === currentValue ? 'item item__selected' : 'item'
        }
        onClick={setValue.bind(null, state.value)}
      >
        {state.value}
      </div>
    ))}
    <button onClick={nextValue}>{'>'}</button>
  </div>
)

export default StateControlDisplay
