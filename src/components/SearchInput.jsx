import React from 'react'
import Spinner from './Spinner'
import styles from './SearchInput.module.css'

export default ({ spotLoading, inputProps }) => (
  <div className={styles.inputContainer}>
    <input {...inputProps} />
    {spotLoading &&
      <Spinner inline />
    }
  </div>
)
