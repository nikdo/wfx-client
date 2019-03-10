import React from 'react'
import Header from '../components/Header'
import SpotTitle from '../components/SpotTitle'
import Chart from '../components/Chart'
import Attribution from '../components/Attribution'

export default ({ spotDetail, fetchSpot }) => <>
  <Header
    onSpotSelected={id => fetchSpot(id)} />
  <main>
    <SpotTitle spot={spotDetail} />
    <Chart spotId={spotDetail._id} forecast={spotDetail.forecast} />
    <Attribution />
  </main>
</>
