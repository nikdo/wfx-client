import React from 'react'
import SearchContainer from '../containers/Search'
import styles from './Home.module.css'

export default () => {
  return <section className={styles.search}>
    <SearchContainer autoFocus />
  </section>
}
