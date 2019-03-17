import React from 'react'
import classNames from 'classnames'
import { ReactComponent as SearchIcon } from './search.svg'
import Spinner from '../../components/Spinner'
import styles from './SearchInput.module.css'

export default ({ fat, spotLoading, inputProps }) => (
  <div className={classNames(styles.inputContainer, { [styles.fat]: fat })}>
    <input {...inputProps} />
    <div className={styles.control}>
      {spotLoading ? (
        <Spinner inline className={styles.spinner} />
      ) : (
        <SearchIcon className={styles.searchIcon} />
      )}
    </div>
  </div>
)
