import React from 'react'
import styles from './SpotTitle.module.css'

export default ({ spot }) => <header>
  <h1 className={styles.title}>{spot.name}</h1>
  <p className={styles.location}>
    { spot.region && spot.region + ', ' }
    { spot.country }
  </p>
</header>
