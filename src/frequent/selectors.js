import { createSelector } from 'reselect'
import { getSpots } from '../selectors'

export const getFrequentSpotsIds = state =>
  Object.keys(state.visits)
    .map(key => ({ id: key, visits: state.visits[key] }))
    .concat().sort((a, b) => b.visits.length - a.visits.length)
    .map(spotVisits => spotVisits.id)

export const getFrequentSpots = createSelector(
  getFrequentSpotsIds,
  getSpots,
  (frequentSpotsIds, spots) => frequentSpotsIds.map(id => spots.find(spot => spot._id === id))
)
