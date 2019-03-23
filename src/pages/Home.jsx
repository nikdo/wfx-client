import React from 'react'
import SearchContainer from '../search/containers/Search'
import styles from './Home.module.css'
import { ReactComponent as Logo } from '../img/logo.svg'

export default () => {
  return <header className={styles.header}>
    <h1>
      <Logo className={styles.logo} />
      <span>Wind Freaks</span>
    </h1>
    <SearchContainer className={styles.search} autoFocus fat />
  </header>
}
