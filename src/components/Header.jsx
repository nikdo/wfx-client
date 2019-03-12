import React from 'react'
import SearchContainer from '../containers/Search'
import styles from './Header.module.css'

export default () => (
  <header className={styles.header}>
    <SearchContainer />
  </header>
)
