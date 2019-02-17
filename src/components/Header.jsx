import React from 'react'
import Selector from './Selector'

export default props => (
  <header>
    <Selector
      value={props.selectedSpotId}
      spots={props.spots}
      onChange={props.onSpotSelected} />
  </header>
)
