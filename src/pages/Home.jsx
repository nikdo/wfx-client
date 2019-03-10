import React from 'react'
import SearchContainer from '../containers/Search'
import styles from './Home.module.css'

export default ({ spots, onSpotSelected }) => {
  return <section className={styles.search}>
    <SearchContainer
      autoFocus
      spots={spots}
      onSpotSelected={onSpotSelected} />
  </section>
}
