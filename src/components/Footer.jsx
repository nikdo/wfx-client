import React from 'react'
import Attribution from './Attribution'
import FacebookLink from './FacebookLink'
import styles from './Footer.module.css'

export default () => (
  <section className={styles.footer}>
    <Attribution />
    <FacebookLink />
  </section>
)
