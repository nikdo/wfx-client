import React from 'react'
import classNames from 'classnames'
import styles from './Attribution.module.css'
import logo from '../img/dark-sky@2x.png'

export default ({ className }) => (
  <section className={classNames(styles.attribution, className)}>
    <a href='https://darksky.net/poweredby/'>
      <img src={logo} alt='Powered by Dark Sky' />
    </a>
  </section>
)
