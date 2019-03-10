import React from 'react'
import SearchContainer from '../containers/Search'
import styles from './Header.module.css'

export default ({ spots, spotLoading, onSpotSelected }) => (
  <header className={styles.header}>
    <SearchContainer
      spots={spots}
      spotLoading={spotLoading}
      onSpotSelected={onSpotSelected} />
  </header>
)
