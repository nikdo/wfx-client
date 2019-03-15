import React from 'react'
import classNames from 'classnames'
import parse from 'autosuggest-highlight/parse'
import styles from './HighlightedText.module.css'

export default ({ text, matches }) => <>
  {parse(text, matches).map((fragment, i) =>
    <span key={i} className={classNames({ [styles.highlight]: fragment.highlight })}>
      {fragment.text}
    </span>
  )}
</>
