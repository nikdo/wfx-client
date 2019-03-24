import React from 'react'
import styles from './Attribution.module.css'
import logo from '../img/dark-sky@2x.png'

export default () => (
  <footer className={styles.attribution}>
    <a href='https://darksky.net/poweredby/'>
      <img src={logo} alt='Powered by Dark Sky' />
    </a>
  </footer>
)
