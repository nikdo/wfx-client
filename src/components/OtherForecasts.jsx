import React from 'react'
import newTabProps from './newTabProps'
import { ReactComponent as WindyLogo } from '../img/windy.svg'
import { ReactComponent as WindguruLogo } from '../img/windguru.svg'
import { ReactComponent as WindfinderLogo } from '../img/windfinder.svg'
import styles from './OtherForecasts.module.css'

export default ({ lat, lng, windguruId, windfinderId }) => (
  <section className={`layout-section ${styles.forecasts}`}>
    <p>Other forecasts:</p>
    <ul>
      <li>
        <a href={`https://www.windy.com/${lat}/${lng}`} title='Windy' {...newTabProps}>
          <WindyLogo />
        </a>
      </li>
      {windguruId &&
        <li>
          <a href={`https://www.windguru.cz/${windguruId}`} title='Windguru' {...newTabProps}>
            <WindguruLogo />
          </a>
        </li>
      }
      {windfinderId &&
        <li>
          <a href={`https://www.windfinder.com/forecast/${windfinderId}`} title='Windfinder' {...newTabProps}>
            <WindfinderLogo />
          </a>
        </li>
      }
    </ul>
  </section>
)
