import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFrequentSpots } from './selectors'

export default () => {
  const spots = useSelector(getFrequentSpots)

  return (
    <ul>
      {spots.map(spot => (
        <li key={spot._id}>
          <Link to={`/${spot._id}`}>{spot.name}</Link>
        </li>
      ))}
    </ul>
  )
}
