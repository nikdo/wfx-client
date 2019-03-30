import React from 'react'
import SearchContainer from '../search/containers/Search'
import styles from './Header.module.css'

export default () => (
  <header className={styles.topHeader}>
    <SearchContainer />
  </header>
)
