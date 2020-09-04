import React from 'react'
import classNames from 'classnames'
import styles from './SectionHeading.module.css'

export default ({ inverted = false, text }) => (
  <h2 className={classNames({ [styles.inverted]: inverted })}>{text}</h2>
)
