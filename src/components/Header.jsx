import React from 'react'
import Selector from './Selector'
import styles from './Header.module.css'

export default props => (
  <header className={styles.header}>
    <Selector
      value={props.selectedSpotId}
      spotLoading={props.spotLoading}
      spots={props.spots}
      onChange={props.onSpotSelected} />
  </header>
)
