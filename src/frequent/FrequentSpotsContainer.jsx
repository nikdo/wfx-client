import React from 'react'
import { useSelector } from 'react-redux'
import { getFrequentSpots } from './selectors'
import SectionHeading from 'components/SectionHeading'
import SpotList from './SpotList'

export default () => {
  const spots = useSelector(getFrequentSpots)

  return !!spots?.length && (
    <>
      <SectionHeading text='Frequent' inverted />
      <SpotList spots={spots} />
    </>
  )
}
