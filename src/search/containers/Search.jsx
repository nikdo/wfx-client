import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSpots, getSearchQuery, getSpotLoading } from 'selectors'
import { fetchSpotDetail } from 'actions'
import { searchQueryChange } from '../reducer'
import Search from '../components/Search'

export default props => {
  const spots = useSelector(getSpots)
  const searchQuery = useSelector(getSearchQuery)
  const spotLoading = useSelector(getSpotLoading)
  const dispatch = useDispatch()
  return (
    <Search
      {...props}
      spots={spots}
      query={searchQuery}
      spotLoading={spotLoading}
      onChange={query => dispatch(searchQueryChange(query))}
      onSpotSelected={id => fetchSpotDetail(dispatch, id)}
    />
  )
}
