import React from 'react'

export default ({ spots, onSpotSelected }) => <button onClick={() => onSpotSelected(spots[0]._id)}>
  Select first spot
</button>
