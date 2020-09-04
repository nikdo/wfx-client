import React from 'react'
import { useSelector } from 'react-redux'
import { getFrequentSpots } from './selectors'
import SectionHeading from 'components/SectionHeading'
import SpotList from './SpotList'

export default () => {
  const spots = useSelector(getFrequentSpots)

  return !!spots?.length && (
    <>
      <SectionHeading inverted>Frequent</SectionHeading>
      <SpotList spots={spots} />
    </>
  )
}
