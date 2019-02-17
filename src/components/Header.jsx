import React from 'react'
import Selector from './Selector'
import Spinner from './Spinner'
import styles from './Header.module.css'

export default props => (
  <header className={styles.header}>
    <Selector
      value={props.selectedSpotId}
      disabled={props.spotLoading}
      spots={props.spots}
      onChange={props.onSpotSelected} />
    {props.spotLoading &&
      <div className={styles.loading}>
        <Spinner inline={true} />
      </div>
    }
  </header>
)
