import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { ReactComponent as Logo } from '../img/logo.svg'
import styles from './Logo.module.css'

export default ({ fat = false, className }) => (
  <Link to='/' className={classNames(styles.logo, className, { [styles.fat]: fat })}>
    <Logo />
    <span className={styles.name}>Wind Freaks</span>
  </Link>
)
