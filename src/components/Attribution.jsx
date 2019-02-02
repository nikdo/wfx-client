import React from 'react'
import { ReactComponent as DarkSkyLogo } from '../img/dark-sky.svg'
import styles from './Attribution.module.css'

export default () => (
  <p className={styles.attribution}>
    <a href='https://darksky.net/poweredby/'>
      <DarkSkyLogo height='17' width='13' />&nbsp;<span>Powered by Dark Sky</span>
    </a>
  </p>
)
