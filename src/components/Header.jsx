import React from 'react'
import classNames from 'classnames'
import Logo from '../components/Logo'
import SearchContainer from '../search/containers/Search'
import Attribution from '../components/Attribution'
import styles from './Header.module.css'

export default ({ fullSize = false }) => (
  <header className={classNames(styles.header, fullSize ? styles.full : styles.top)}>
    {fullSize &&
      <Logo className={styles.logo} />
    }
    <SearchContainer className={styles.search} autoFocus={fullSize} fat={fullSize} />
    {fullSize &&
      <Attribution className={styles.attribution} />
    }
  </header>
)
