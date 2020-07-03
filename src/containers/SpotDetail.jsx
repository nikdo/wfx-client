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
    // fetch spot detail when it is not triggered from search:
    // loading app on spot detail URL or using browser back/forward to navigate
    if (!spot || spot._id !== match.params.spotId) {
      fetchSpotDetail(dispatch, match.params.spotId)
    }
    // ignore changes of spot detail in store: prevents triggering another fetch
    // in the small window between receiving spot after search and changing URL
    // eslint-disable-next-line
  }, [match.params.spotId, dispatch])

  return spot
    ? <SpotDetail spot={spot} />
    : <Spinner />
}
