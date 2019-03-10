import React from 'react'
import Search from './Search'
import styles from './Header.module.css'

export default ({ spots, spotLoading, onSpotSelected }) => (
  <header className={styles.header}>
    <Search
      spots={spots}
      spotLoading={spotLoading}
      onSpotSelected={onSpotSelected} />
  </header>
)
