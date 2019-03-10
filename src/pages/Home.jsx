import React from 'react'
import SearchContainer from '../containers/Search'
import styles from './Home.module.css'

export default ({ query, dispatch, spots, spotLoading, onSpotSelected }) => {
  return <section className={styles.search}>
    <SearchContainer
      autoFocus
      query={query}
      dispatch={dispatch}
      spots={spots}
      spotLoading={spotLoading}
      onSpotSelected={onSpotSelected} />
  </section>
}
