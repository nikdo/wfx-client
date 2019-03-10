import React from 'react'
import Search from '../components/Search'
import styles from './Home.module.css'

export default ({ query, dispatch, spots, spotLoading, onSpotSelected }) => {
  return <section className={styles.search}>
    <Search
      autoFocus
      query={query}
      onChange={payload => dispatch({ type: 'SEARCH_QUERY_CHANGE', payload })}
      spots={spots}
      spotLoading={spotLoading}
      onSpotSelected={onSpotSelected} />
  </section>
}
