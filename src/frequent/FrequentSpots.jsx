import React from 'react'
import { Link } from 'react-router-dom'

export default ({ spots }) => (
  <ul>
    {spots.map(spot => (
      <li key={spot._id}>
        <Link to={`/${spot._id}`}>
          <div>{spot.name}</div>
          <p style={{ margin: 0 }}>
            {spot.region && spot.region + ', '}
            {spot.country}
          </p>
        </Link>
      </li>
    ))}
  </ul>
)
