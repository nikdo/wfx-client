import React from 'react'
import SpotTitle from '../components/SpotTitle'
import Chart from '../chart/components/Chart'
import OtherForecasts from '../components/OtherForecasts'
import styles from './Detail.module.css'

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
