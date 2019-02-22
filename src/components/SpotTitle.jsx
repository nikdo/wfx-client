import React from 'react'
import styles from './SpotTitle.module.css'

export default ({ spot }) => <header>
  <h1>{spot.name}</h1>
  <p className={styles.location}>{spot.country}</p>
</header>
