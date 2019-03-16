import React from 'react'
import { ReactComponent as SearchIcon } from './search.svg'
import Spinner from '../../components/Spinner'
import styles from './SearchInput.module.css'

export default ({ spotLoading, inputProps }) => (
  <div className={styles.inputContainer}>
    <input {...inputProps} />
    {spotLoading ? (
      <Spinner inline />
    ) : (
      <SearchIcon className={styles.searchIcon} />
    )}
  </div>
)
