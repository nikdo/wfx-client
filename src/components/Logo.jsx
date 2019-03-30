import React from 'react'
import classNames from 'classnames'
import { ReactComponent as Logo } from '../img/logo.svg'
import styles from './Logo.module.css'

export default ({ className }) => (
  <div className={classNames(styles.logo, className)}>
    <Logo />
    <span>Wind Freaks</span>
  </div>
)
