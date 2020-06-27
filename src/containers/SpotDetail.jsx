import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSpotDetail } from 'actions'
import { getSpotDetail } from 'selectors'
import Spinner from 'components/Spinner'
import SpotDetail from 'components/SpotDetail'

export default ({ match }) => {
  const spot = useSelector(getSpotDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    // fetch is initiated from here only if this is not accessed from search
    // selection callback: opening app right on spot detail URL
    if (!spot) {
      fetchSpotDetail(dispatch, match.params.spotId)
    }
  // eslint-disable-next-line
  }, [])

  return spot
    ? <SpotDetail spot={spot} />
    : <Spinner />
}
