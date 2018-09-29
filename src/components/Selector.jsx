import React from 'react'

const label = ({ country, region, name }) =>
  `${country} ${region ? region + ': ' : ''} ${name}`

export default ({ value, spots, onChange }) => (
  <select value={value} onChange={onChange}>
    {spots.map(spot =>
      <option value={spot._id} key={spot._id}>{label(spot)}</option>
    )}
  </select>
)
