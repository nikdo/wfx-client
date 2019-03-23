import React from 'react'
import styles from './Spinner.module.css'

// https://codepen.io/supah/pen/BjYLdW
export default ({ inline = false }) => {
  const position = inline
    ? {
      width: 25,
      height: 25
    }
    : {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 50,
      height: 50,
      marginLeft: -25,
      marginTop: -25
    }
  const strokeWidth = inline ? 6 : 4
  return <svg
    className={styles.spinner}
    viewBox='0 0 50 50'
    style={position}
  >
    <linearGradient id='gradient'>
      <stop offset='30%' stopColor='#476FB8' />
      <stop offset='100%' stopColor='#5657AE' />
    </linearGradient>
    <circle
      className={styles.path}
      cx='25' cy='25' r='20'
      strokeWidth={strokeWidth}
      stroke='url(#gradient)' />
  </svg>
}
