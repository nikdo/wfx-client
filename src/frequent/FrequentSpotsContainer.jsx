import React from 'react'
import { useSelector } from 'react-redux'
import { getFrequentSpots } from './selectors'

export default () => {
  const spots = useSelector(getFrequentSpots)

  return (
    <ul>
      {spots.map(spot => <li key={spot}>{spot}</li>)}
    </ul>
  )
}
