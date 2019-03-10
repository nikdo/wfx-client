import React from 'react'
import SearchContainer from '../containers/Search'
import styles from './Header.module.css'

export default ({ onSpotSelected }) => (
  <header className={styles.header}>
    <SearchContainer
      onSpotSelected={onSpotSelected} />
  </header>
)
