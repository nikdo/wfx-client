import React from 'react'
import newTabProps from './newTabProps'
import styles from './FacebookLink.module.css'

const URL = 'https://www.facebook.com/windfreaksnet/'

export default () => (
  <a className={styles.link} href={URL} {...newTabProps}>
    Follow us<br />on Facebook
  </a>
)
