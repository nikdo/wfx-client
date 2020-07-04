import React from 'react'
import { Helmet } from 'react-helmet'
import styles from './SpotTitle.module.css'

export default ({ spot }) => (
  <header className='layout-section'>
    <Helmet>
      <title>{spot.name}</title>
    </Helmet>
    <h1 className={styles.title}>{spot.name}</h1>
    <p className={styles.location}>
      {spot.region && spot.region + ', '}
      {spot.country}
    </p>
  </header>
)
