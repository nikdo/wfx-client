import React from 'react'
import SearchContainer from '../search/containers/Search'
import styles from './Home.module.css'

export default () => {
  return <section className={styles.search}>
    <SearchContainer autoFocus fat />
  </section>
}
