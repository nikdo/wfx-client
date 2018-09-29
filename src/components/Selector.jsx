import React from 'react'

export default ({ options, onChange }) => (
  <select onChange={onChange}>
    {options.map((option) =>
      <option value={option._id} key={option._id}>{option.name}</option>
    )}
  </select>
)
