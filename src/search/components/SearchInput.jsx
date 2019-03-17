import React from 'react'
import classNames from 'classnames'
import { ReactComponent as SearchIcon } from './search.svg'
import Spinner from '../../components/Spinner'
import styles from './SearchInput.module.css'

export default ({ fat, spotLoading, inputProps, onSearchIconClick }) => (
  <div className={classNames(styles.inputContainer, { [styles.fat]: fat })}>
    <input {...inputProps} />
    {spotLoading ? (
      <div className={styles.control}>
        <Spinner inline className={styles.spinner} />
      </div>
    ) : (
      <div className={styles.control} onClick={onSearchIconClick}>
        <SearchIcon className={styles.searchIcon} />
      </div>
    )}
  </div>
)
