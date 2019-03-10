import React from 'react'
import Search from './Search'
import styles from './Header.module.css'

export default ({ query, onQueryChange, spots, spotLoading, onSpotSelected }) => (
  <header className={styles.header}>
    <Search
      query={query}
      onChange={onQueryChange}
      spots={spots}
      spotLoading={spotLoading}
      onSpotSelected={onSpotSelected} />
  </header>
)
