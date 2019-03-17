import React from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './OpacityTransition.module.css'

export default (props) => (
  <CSSTransition in={props.in} classNames={styles} timeout={200} unmountOnExit>
    {props.children}
  </CSSTransition>
)
