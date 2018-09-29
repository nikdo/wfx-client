import React from 'react'

const label = ({ country, region, name }) =>
  `${country} ${region ? region + ': ' : ''} ${name}`

export default ({ spots, onChange }) => (
  <select onChange={onChange}>
    {spots.map(spot =>
      <option value={spot._id} key={spot._id}>{label(spot)}</option>
    )}
  </select>
)
