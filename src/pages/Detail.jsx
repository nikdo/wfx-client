import React from 'react'
import Header from '../components/Header'
import SpotTitle from '../components/SpotTitle'
import Chart from '../chart/components/Chart'
import OtherForecasts from '../components/OtherForecasts'

export default ({ spotDetail }) => <>
  <Header />
  <main>
    <SpotTitle spot={spotDetail} />
    <Chart spotId={spotDetail._id} forecast={spotDetail.forecast} />
    <OtherForecasts />
  </main>
</>
