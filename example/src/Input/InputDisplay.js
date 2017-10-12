import React from 'react'

const InputDisplay = ({ name, onFocus, onBlur, hasFocus }) => (
  <input
    name={name}
    className={`input ${hasFocus ? 'focus' : ''}`}
    onFocus={onFocus}
    onBlur={onBlur}
  />
)

export default InputDisplay
