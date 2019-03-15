import React from 'react'
import classNames from 'classnames'
import parse from 'autosuggest-highlight/parse'
import styles from './SearchSuggestion.module.css'

export default ({ spot }) => <>
  <div>
    {parse(spot.name, spot.nameMatches).map((fragment, i) =>
      <span key={i} className={classNames({ [styles.highlight]: fragment.highlight })}>
        {fragment.text}
      </span>
    )}
  </div>
  <div className={styles.location}>
    {spot.region && parse(spot.region, spot.regionMatches).map((fragment, i) =>
      <span key={i} className={classNames({ [styles.highlight]: fragment.highlight })}>
        {fragment.text}
      </span>
    )}
    {spot.region && ', '}
    <span>{spot.country}</span>
  </div>
</>
