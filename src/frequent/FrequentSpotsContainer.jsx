import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFrequentSpots } from './selectors'

export default () => {
  const spots = useSelector(getFrequentSpots)

  return (
    <ul>
      {spots.map(id => (
        <li key={id}>
          <Link to={`/${id}`}>{id}</Link>
        </li>
      ))}
    </ul>
  )
}
