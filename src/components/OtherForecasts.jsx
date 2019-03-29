import React from 'react'
import { ReactComponent as WindyLogo } from '../img/windy.svg'
import { ReactComponent as WindguruLogo } from '../img/windguru.svg'
import { ReactComponent as WindfinderLogo } from '../img/windfinder.svg'
import styles from './OtherForecasts.module.css'

const newTab = {
  target: '_blank',
  rel: 'noopener noreferrer'
}

export default ({ lat, lng }) => (
  <section className='layout-section'>
    <p>Other forecasts:</p>
    <ul className={styles.links}>
      <li>
        <a href={`https://www.windy.com/${lat}/${lng}`} title='Windy' {...newTab}>
          <WindyLogo />
        </a>
      </li>
      <li>
        <a href='https://www.windguru.cz/' title='Windguru' {...newTab}>
          <WindguruLogo />
        </a>
      </li>
      <li>
        <a href='https://www.windfinder.com/' title='Windfinder' {...newTab}>
          <WindfinderLogo />
        </a>
      </li>
    </ul>
  </section>
)
