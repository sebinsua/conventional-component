import React from 'react'

const InputDisplay = ({
  name,
  value,
  hasFocus,
  onBlur,
  onChange,
  onFocus,
  reset
}) => (
  <div className={`input__container ${hasFocus ? 'focus' : ''}`}>
    <input
      name={name}
      className="input__field"
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
    <button className="input__reset" onClick={reset}>
      x
    </button>
  </div>
)

export default InputDisplay
