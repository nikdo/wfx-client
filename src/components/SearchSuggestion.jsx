import React from 'react'
import HighlightedText from './HighlightedText'
import styles from './SearchSuggestion.module.css'

export default ({ spot }) => <>
  <div>
    <HighlightedText text={spot.name} matches={spot.nameMatches} />
  </div>
  <div className={styles.location}>
    {spot.region && <>
      <HighlightedText text={spot.region} matches={spot.regionMatches} />
      {', '}
    </>}
    <span>{spot.country}</span>
  </div>
</>
