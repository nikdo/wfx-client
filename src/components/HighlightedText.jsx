import React from 'react'
import classNames from 'classnames'
import styles from './HighlightedText.module.css'

export default ({ fragments }) => <>
  {fragments.map((fragment, i) =>
    <span key={i} className={classNames({ [styles.highlight]: fragment.highlight })}>
      {fragment.text}
    </span>
  )}
</>
