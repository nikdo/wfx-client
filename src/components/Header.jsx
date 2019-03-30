import React from 'react'
import Attribution from '../components/Attribution'
import SearchContainer from '../search/containers/Search'
import { ReactComponent as Logo } from '../img/logo.svg'
import styles from './Header.module.css'

export default ({ fullSize = false }) => (
  fullSize
    ? (
      <header className={styles.header}>
        <h1>
          <Logo className={styles.logo} />
          <span>Wind Freaks</span>
        </h1>
        <SearchContainer className={styles.search} autoFocus fat />
        <Attribution className={styles.attribution} />
      </header>
    )
    : (
      <header className={styles.topHeader}>
        <SearchContainer />
      </header>
    )
)
