import React from 'react'
import classNames from 'classnames'
import { ReactComponent as SearchIcon } from './search.svg'
import { ReactComponent as CrossIcon } from './cross.svg'
import OpacityTransition from '../../components/OpacityTransition'
import Spinner from '../../components/Spinner'
import styles from './SearchInput.module.css'

const SearchControl = ({ spotLoading, showSearchIcon, onSearchIconClick }) => {
  if (spotLoading) {
    return <div className={styles.control}>
      <Spinner inline />
    </div>
  }

  return <>
    <OpacityTransition in={showSearchIcon}>
      <div className={styles.control} onClick={onSearchIconClick}>
        <SearchIcon className={styles.searchIcon} />
      </div>
    </OpacityTransition>
    <OpacityTransition in={!showSearchIcon}>
      <div className={styles.control}>
        <CrossIcon className={styles.crossIcon} />
      </div>
    </OpacityTransition>
  </>
}

export default (props) => {
  const { fat, inputProps, ...controlProps } = props
  return <div className={classNames(styles.inputContainer, { [styles.fat]: fat })}>
    <input {...inputProps} />
    <SearchControl {...controlProps} />
  </div>
}
