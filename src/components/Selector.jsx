import React from 'react'

export default ({ options, onChange }) => (
  <select onChange={onChange}>
    {options.map(spot =>
      <option value={spot._id} key={spot._id}>
        {spot.country + ' '}
        {spot.region && spot.region + ': '}
        {spot.name}
      </option>
    )}
  </select>
)
