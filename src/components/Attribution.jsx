import React from 'react'
import { ReactComponent as DarkSkyLogo } from '../img/dark-sky.svg'
import './Attribution.css'

export default () => (
  <a href='https://darksky.net/poweredby/'>
    <DarkSkyLogo height='17' width='13' />&nbsp;<span>Powered by Dark Sky</span>
  </a>
)
