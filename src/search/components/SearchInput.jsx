import React from 'react'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import { ReactComponent as SearchIcon } from './search.svg'
import Spinner from '../../components/Spinner'
import styles from './SearchInput.module.css'

const SearchControl = ({ spotLoading, showSearchIcon, onSearchIconClick }) => {
  if (spotLoading) {
    return <div className={styles.control}>
      <Spinner inline />
    </div>
  }

  return (
    <CSSTransition
      in={showSearchIcon}
      classNames={styles}
      unmountOnExit
      timeout={300}
    >
      <div className={styles.control} onClick={onSearchIconClick}>
        <SearchIcon className={styles.searchIcon} />
      </div>
    </CSSTransition>
  )
}

export default (props) => {
  const { fat, inputProps, ...controlProps } = props
  return <div className={classNames(styles.inputContainer, { [styles.fat]: fat })}>
    <input {...inputProps} />
    <SearchControl {...controlProps} />
  </div>
}
