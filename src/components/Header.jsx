import React from 'react'
import Selector from './Selector'
import styles from './Header.module.css'

export default props => (
  <header className={styles.header}>
    <Selector
      value={props.selectedSpotId}
      disabled={props.spotLoading}
      spots={props.spots}
      onChange={props.onSpotSelected} />
    {props.spotLoading &&
      <span className={styles.loading}>loading&hellip;</span>
    }
  </header>
)
