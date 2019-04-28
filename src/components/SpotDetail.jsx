import React from 'react'
import Chart from 'chart/components/Chart'
import SpotTitle from './SpotTitle'
import OtherForecasts from './OtherForecasts'
import styles from './SpotDetail.module.css'

export default ({ spotDetail }) => (
  <main className={styles.main}>
    <SpotTitle spot={spotDetail} />
    <Chart spotId={spotDetail._id} forecast={spotDetail.forecast} />
    <OtherForecasts
      lat={spotDetail.lat}
      lng={spotDetail.lng}
      windguruId={spotDetail.forecasts.Windguru}
      windfinderId={spotDetail.forecasts.Windfinder}
    />
  </main>
)
