import React from 'react'
import Attribution from '../components/Attribution'
import SearchContainer from '../search/containers/Search'
import { ReactComponent as Logo } from '../img/logo.svg'
import styles from './Header.module.css'

export default ({ fullSize = false }) => (
  <header className={fullSize ? styles.header : styles.topHeader}>
    {fullSize &&
      <h1>
        <Logo className={styles.logo} />
        <span>Wind Freaks</span>
      </h1>
    }
    <SearchContainer className={styles.search} autoFocus={fullSize} fat={fullSize} />
    {fullSize &&
      <Attribution className={styles.attribution} />
    }
  </header>
)
