import React from 'react'
import classNames from 'classnames'
import { ReactComponent as Logo } from '../img/logo.svg'
import styles from './Logo.module.css'

export default ({ fat = false, className }) => (
  <div className={classNames(styles.logo, className, { [styles.fat]: fat })}>
    <Logo />
    <span className={styles.name}>Wind Freaks</span>
  </div>
)
