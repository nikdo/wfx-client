import React from 'react'
import classNames from 'classnames'
import { ReactComponent as SearchIcon } from './search.svg'
import { ReactComponent as CrossIcon } from './cross.svg'
import OpacityTransition from '../../components/OpacityTransition'
import Spinner from '../../components/Spinner'
import styles from './SearchInput.module.css'

const SearchControl = ({ spotLoading, showSearchIcon, onSearchClick, onCancelClick }) => {
  if (spotLoading) {
    return <Spinner inline />
  }

  return <>
    <OpacityTransition in={showSearchIcon}>
      <span
        className={styles.search}
        onClick={(e) => {
          e.preventDefault()
          onSearchClick()
        }}
      >
        <SearchIcon />
      </span>
    </OpacityTransition>
    <OpacityTransition in={!showSearchIcon}>
      <span
        className={styles.cancel}
        onClick={(e) => {
          e.preventDefault()
          onCancelClick()
        }}
      >
        <CrossIcon />
      </span>
    </OpacityTransition>
  </>
}

export default (props) => {
  const { fat, inputProps, ...controlProps } = props
  return <div className={classNames(styles.inputContainer, { [styles.fat]: fat })}>
    <input {...inputProps} />
    <div className={styles.control}>
      <SearchControl {...controlProps} />
    </div>
  </div>
}
