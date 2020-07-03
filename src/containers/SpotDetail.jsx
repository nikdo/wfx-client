import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSpotDetail } from 'actions'
import { getSpotDetail } from 'selectors'
import Spinner from 'components/Spinner'
import SpotDetail from 'components/SpotDetail'

export default () => {
  const { spotId } = useParams()
  const spot = useSelector(getSpotDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    // fetch spot detail when it is not triggered from search:
    // loading app on spot detail URL or using browser back/forward to navigate
    if (!spot || spot._id !== spotId) {
      fetchSpotDetail(dispatch, spotId)
    }
    // ignore changes of spot detail in store: prevents triggering another fetch
    // in the small window between receiving spot after search and changing URL
    // eslint-disable-next-line
  }, [spotId, dispatch])

  return spot
    ? <SpotDetail spot={spot} />
    : <Spinner />
}
