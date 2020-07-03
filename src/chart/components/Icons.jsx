import React from 'react'
import { ReactComponent as Arrow } from '../img/arrow.svg'
import { ReactComponent as Moon } from '../img/moon.svg'
import { ReactComponent as Sunrise } from '../img/sunrise.svg'
import { ReactComponent as Sunset } from '../img/sunset.svg'

export const arrowId = 'arrow-icon'
export const moonId = 'moon-icon'
export const sunriseId = 'sunrise-icon'
export const sunsetId = 'sunset-icon'

export default () => (
  <>
    <g id={arrowId}><Arrow /></g>
    <g id={moonId}><Moon /></g>
    <g id={sunriseId}><Sunrise /></g>
    <g id={sunsetId}><Sunset /></g>
  </>
)
