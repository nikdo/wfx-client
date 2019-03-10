import React from 'react'
import Search from './Search'
import styles from './Header.module.css'

export default ({ query, dispatch, spots, spotLoading, onSpotSelected }) => (
  <header className={styles.header}>
    <Search
      query={query}
      onChange={payload => dispatch({ type: 'SEARCH_QUERY_CHANGE', payload })}
      spots={spots}
      spotLoading={spotLoading}
      onSpotSelected={onSpotSelected} />
  </header>
)
