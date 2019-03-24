import React from 'react'
import classNames from 'classnames'
import styles from './Attribution.module.css'
import logo1x from '../img/dark-sky@1x.png'
import logo2x from '../img/dark-sky@2x.png'
import logo3x from '../img/dark-sky@3x.png'

export default ({ className }) => (
  <section className={classNames(styles.attribution, className)}>
    <a href='https://darksky.net/poweredby/'>
      <img
        srcSet={`${logo1x}, ${logo2x} 2x, ${logo3x} 3x`}
        src={logo3x}
        alt='Powered by Dark Sky'
      />
    </a>
  </section>
)
