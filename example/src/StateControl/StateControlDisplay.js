import React from 'react'
import cx from 'classnames'

const StateControlDisplay = ({
  states,
  defaultValue,
  focusedValue,
  hoveredValue,
  selectedValue,
  setValue,
  hoverValue,
  previousValue,
  nextValue
}) => (
  <div onMouseOut={hoverValue.bind(null, undefined)}>
    <button onClick={previousValue}>{'<'}</button>
    {states.map((state, idx) => (
      <button
        key={`item-${idx}`}
        id={`item-${state.value}`}
        tabIndex={state.value === selectedValue ? 0 : -1}
        className={cx('item', state.inputClassName, {
          item__focused: state.value === focusedValue,
          item__hovered: state.value === hoveredValue,
          item__selected: state.value === (selectedValue || defaultValue)
        })}
        onMouseOver={hoverValue.bind(null, state.value)}
        onClick={setValue.bind(null, state.value)}
      >
        {state.value}
      </button>
    ))}
    <button onClick={nextValue}>{'>'}</button>
  </div>
)

export default StateControlDisplay
