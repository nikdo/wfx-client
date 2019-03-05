import React from 'react'

export default ({ spots, onSpotSelected }) => <ul>
  {spots.map(spot =>
    <li onClick={() => onSpotSelected(spot._id)}>
      {spot.name}
    </li>
  )}
</ul>
