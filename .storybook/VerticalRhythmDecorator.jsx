import React from 'react'
import style from './VerticalRhythmDecorator.module.css'

export default storyFn => (
  <div className={style.wrapper}>
    {storyFn()}
  </div>
)
