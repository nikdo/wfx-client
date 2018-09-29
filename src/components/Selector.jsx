import React from 'react'

export default ({ options, onChange }) => (
  <select defaultValue='0' onChange={onChange}>
    {options.map((option, i) =>
      <option value={i} key={i}>{option}</option>
    )}
  </select>
)
