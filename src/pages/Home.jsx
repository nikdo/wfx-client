import React from 'react'
import Search from '../components/Search'
import styles from './Home.module.css'

export default ({ query, onQueryChange, spots, spotLoading, onSpotSelected }) => {
  return <section className={styles.search}>
    <Search
      autoFocus
      query={query}
      onChange={onQueryChange}
      spots={spots}
      spotLoading={spotLoading}
      onSpotSelected={onSpotSelected} />
  </section>
}
