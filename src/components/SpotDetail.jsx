import React from 'react'
import Chart from 'chart/components/Chart'
import SpotTitle from './SpotTitle'
import OtherForecasts from './OtherForecasts'
import styles from './SpotDetail.module.css'

export default ({ spot }) => (
  <main className={styles.main}>
    <SpotTitle spot={spot} />
    <Chart spotId={spot._id} forecast={spot.forecast} />
    <OtherForecasts
      lat={spot.lat}
      lng={spot.lng}
      windguruId={spot.forecasts?.Windguru}
      windfinderId={spot.forecasts?.Windfinder}
    />
  </main>
)
