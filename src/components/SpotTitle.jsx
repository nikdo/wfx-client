import React from 'react'
import location from './location'
import styles from './SpotTitle.module.css'

export default ({ spot }) => <header>
  <h1 className={styles.title}>{spot.name}</h1>
  <p className={styles.location}>{location(spot)}</p>
</header>
