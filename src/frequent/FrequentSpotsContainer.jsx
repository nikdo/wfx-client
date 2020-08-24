import React from 'react'
import { useSelector } from 'react-redux'
import { getFrequentSpots } from './selectors'
import FrequentSpots from './FrequentSpots'

export default () => {
  const spots = useSelector(getFrequentSpots)

  return <FrequentSpots spots={spots} />
}
