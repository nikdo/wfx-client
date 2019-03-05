import React from 'react'
import Header from '../components/Header'
import SpotTitle from '../components/SpotTitle'
import Chart from '../components/Chart'
import Attribution from '../components/Attribution'

export default ({ spots, selectedSpotId, spotLoading, spotDetail, fetchSpot }) => <>
  <Header
    spots={spots}
    selectedSpotId={selectedSpotId}
    onSpotSelected={id => fetchSpot(id)}
    spotLoading={spotLoading} />
  <main>
    <SpotTitle spot={spotDetail} />
    <Chart spotId={spotDetail._id} forecast={spotDetail.forecast} />
    <Attribution />
  </main>
</>
