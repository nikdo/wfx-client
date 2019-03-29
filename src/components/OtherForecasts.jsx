import React from 'react'
import { ReactComponent as WindyLogo } from '../img/windy.svg'
import { ReactComponent as WindguruLogo } from '../img/windguru.svg'
import { ReactComponent as WindfinderLogo } from '../img/windfinder.svg'
import styles from './OtherForecasts.module.css'

export default () => (
  <section className='layout-section'>
    <p>Other forecasts:</p>
    <ul className={styles.links}>
      <li>
        <a href='https://www.windy.com/'>
          <WindyLogo />
        </a>
      </li>
      <li>
        <a href='https://www.windguru.cz/'>
          <WindguruLogo />
        </a>
      </li>
      <li>
        <a href='https://www.windfinder.com/'>
          <WindfinderLogo />
        </a>
      </li>
    </ul>
  </section>
)
