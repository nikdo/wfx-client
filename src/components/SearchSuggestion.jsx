import React from 'react'
import classNames from 'classnames'
import parse from 'autosuggest-highlight/parse'
import styles from './SearchSuggestion.module.css'

const HighlightedText = ({ text, matches }) => <>
  {parse(text, matches).map((fragment, i) =>
    <span key={i} className={classNames({ [styles.highlight]: fragment.highlight })}>
      {fragment.text}
    </span>
  )}
</>

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
