import React from 'react'
import HighlightedText from './HighlightedText'
import styles from './SearchSuggestion.module.css'

export default ({ spot }) => <>
  <div>
    <HighlightedText fragments={spot.nameFragments} />
  </div>
  <div className={styles.location}>
    {spot.region && <>
      <HighlightedText fragments={spot.regionFragments} />
      {', '}
    </>}
    <span>{spot.country}</span>
  </div>
</>
