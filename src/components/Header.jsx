import React from 'react'
import SearchContainer from '../containers/Search'
import styles from './Header.module.css'

export default ({ query, dispatch, spots, spotLoading, onSpotSelected }) => (
  <header className={styles.header}>
    <SearchContainer
      query={query}
      dispatch={dispatch}
      spots={spots}
      spotLoading={spotLoading}
      onSpotSelected={onSpotSelected} />
  </header>
)
