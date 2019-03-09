import React from 'react'
import Search from '../components/Search'
import styles from './Home.module.css'

export default ({ spots, spotLoading, onSpotSelected }) => {
  return <section className={styles.search}>
    <Search
      spots={spots}
      spotLoading={spotLoading}
      onSpotSelected={onSpotSelected} />
  </section>
}
