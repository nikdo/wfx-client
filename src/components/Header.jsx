import React from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

import Logo from '../components/Logo'
import SearchContainer from '../search/containers/Search'
import Attribution from '../components/Attribution'
import styles from './Header.module.css'

const Header = ({ location }) => {
  const fullSize = location.pathname === '/'
  return <header className={classNames(styles.header, fullSize ? styles.full : styles.top)}>
    <div className='layout-section'>
      <Logo className={styles.logo} fat={fullSize} />
      <SearchContainer className={styles.search} autoFocus={fullSize} fat={fullSize} />
      {fullSize &&
        <Attribution className={styles.attribution} />
      }
    </div>
  </header>
}

export default withRouter(Header)
