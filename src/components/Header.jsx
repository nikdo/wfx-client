import React from 'react'
import SearchContainer from '../containers/Search'
import styles from './Header.module.css'

export default ({ spots, onSpotSelected }) => (
  <header className={styles.header}>
    <SearchContainer
      spots={spots}
      onSpotSelected={onSpotSelected} />
  </header>
)
