import React from 'react'
import { Link } from 'react-router-dom'
import styles from './FrequentSpots.module.css'

export default ({ spots }) => (
  <ul className={styles.list}>
    {spots.map(spot => (
      <li className={styles.spot} key={spot._id}>
        <Link to={`/${spot._id}`}>
          <div>{spot.name}</div>
          <div className={styles.location}>
            {spot.region && spot.region + ', '}
            {spot.country}
          </div>
        </Link>
      </li>
    ))}
  </ul>
)
