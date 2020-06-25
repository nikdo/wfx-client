import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSpotDetail } from 'actions'
import { searchQueryChange } from '../reducer'
import { getSpots, getSearchQuery, getSpotLoading } from 'selectors'
import Search from '../components/Search'

export default ({ autoFocus, fat, className }) => {
  const spots = useSelector(getSpots)
  const searchQuery = useSelector(getSearchQuery)
  const spotLoading = useSelector(getSpotLoading)
  const dispatch = useDispatch()
  return (
    <Search
      autoFocus={autoFocus}
      fat={fat}
      className={className}
      onSpotSelected={id => fetchSpotDetail(dispatch, id)}
      spots={spots}
      query={searchQuery}
      spotLoading={spotLoading}
      onChange={query => dispatch(searchQueryChange(query))}
    />
  )
}
