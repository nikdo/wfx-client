import React from 'react'
import styles from './Spinner.module.css'

// https://codepen.io/supah/pen/BjYLdW
export default () => {
  const dimension = 50
  const position = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: dimension,
    height: dimension,
    marginLeft: -0.5 * dimension,
    marginTop: -0.5 * dimension
  }
  const strokeWidth = 4
  return <svg className={styles.spinner} viewBox='0 0 50 50' style={position}>
    <circle className={styles.path} cx='25' cy='25' r='20' strokeWidth={strokeWidth} />
  </svg>
}
