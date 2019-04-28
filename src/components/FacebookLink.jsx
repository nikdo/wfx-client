import React from 'react'
import newTabProps from './newTabProps'
import { ReactComponent as FacebookLogo } from 'img/facebook.svg'
import styles from './FacebookLink.module.css'

const URL = 'https://www.facebook.com/windfreaksnet/'

export default () => (
  <a className={styles.link} href={URL} {...newTabProps}>
    <FacebookLogo />
    <span>
      Follow us<br />
      on Facebook
    </span>
  </a>
)
