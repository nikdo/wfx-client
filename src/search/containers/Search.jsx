import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSpots, getSearchQuery, getSpotLoading } from 'selectors'
import { fetchSpotDetail } from 'actions'
import { searchQueryChange } from '../reducer'
import Search from '../components/Search'

export default props => {
  const spots = useSelector(getSpots)
  const searchQuery = useSelector(getSearchQuery)
  const spotLoading = useSelector(getSpotLoading)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSpotSelected = id =>
    fetchSpotDetail(dispatch, id)
      .then(() => history.push(`/${id}`))

  return (
    <Search
      {...props}
      spots={spots}
      query={searchQuery}
      spotLoading={spotLoading}
      onChange={query => dispatch(searchQueryChange(query))}
      onSpotSelected={handleSpotSelected}
    />
  )
}
