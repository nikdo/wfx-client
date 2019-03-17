import React from 'react'
import classNames from 'classnames'
import { ReactComponent as SearchIcon } from './search.svg'
import { ReactComponent as CrossIcon } from './cross.svg'
import OpacityTransition from '../../components/OpacityTransition'
import Spinner from '../../components/Spinner'
import styles from './SearchInput.module.css'

const SearchControl = ({ spotLoading, showSearchIcon, onSearchIconClick }) => {
  if (spotLoading) {
    return <Spinner inline />
  }

  return <>
    <OpacityTransition in={showSearchIcon}>
      <a href='#'
        className={styles.search}
        onClick={(e) => {
          e.preventDefault()
          onSearchIconClick()
        }}
      >
        <SearchIcon />
      </a>
    </OpacityTransition>
    <OpacityTransition in={!showSearchIcon}>
      <a href='#'
        className={styles.cancel}
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <CrossIcon />
      </a>
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
