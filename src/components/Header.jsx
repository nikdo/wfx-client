import React from 'react'
import classNames from 'classnames'
import Logo from '../components/Logo'
import SearchContainer from '../search/containers/Search'
import Attribution from '../components/Attribution'
import styles from './Header.module.css'

export default ({ fullSize = false }) => (
  <header className={classNames('layout-section', styles.header, fullSize ? styles.full : styles.top)}>
    <Logo className={styles.logo} fat={fullSize} />
    <SearchContainer className={styles.search} autoFocus={fullSize} fat={fullSize} />
    {fullSize &&
      <Attribution className={styles.attribution} />
    }
  </header>
)
