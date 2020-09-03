import React from 'react'
import { useSelector } from 'react-redux'
import { getFrequentSpots } from './selectors'
import SpotList from './SpotList'

export default () => {
  const spots = useSelector(getFrequentSpots)

  return (
    <>
      <h2>Frequent</h2>
      <SpotList spots={spots} />
    </>
  )
}
