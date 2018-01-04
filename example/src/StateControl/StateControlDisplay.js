import React from 'react'
import cx from 'classnames'

// TODO: Pass through name...

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
      <button
        key={`item-${idx}`}
        id={`item-${state.value}`}
        tabIndex={state.value === currentValue ? 0 : -1}
        className={cx('item', state.inputClassName, {
          item__selected: state.value === currentValue
        })}
        onClick={setValue.bind(null, state.value)}
      >
        {state.value}
      </button>
    ))}
    <button onClick={nextValue}>{'>'}</button>
  </div>
)

export default StateControlDisplay
