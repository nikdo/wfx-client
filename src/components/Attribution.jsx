import React from 'react'
import newTabProps from './newTabProps'
import styles from './Attribution.module.css'
import logo1x from '../img/dark-sky@1x.png'
import logo2x from '../img/dark-sky@2x.png'
import logo3x from '../img/dark-sky@3x.png'

const URL = 'https://darksky.net/poweredby/'

export default ({ className }) => (
  <a className={styles.attribution} href={URL} {...newTabProps}>
    <img
      srcSet={`${logo1x}, ${logo2x} 2x, ${logo3x} 3x`}
      src={logo3x}
      alt='Powered by Dark Sky'
    />
  </a>
)
