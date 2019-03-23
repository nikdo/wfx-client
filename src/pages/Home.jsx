import React from 'react'
import SearchContainer from '../search/containers/Search'
import styles from './Home.module.css'

export default () => {
  return <header className={styles.header}>
    <h1>Wind Freaks</h1>
    <SearchContainer autoFocus fat />
  </header>
}
