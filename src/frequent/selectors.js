import { createSelector } from 'reselect'
import { getSpots } from '../selectors'

export const getFrequentSpotsIds = state =>
  Object.keys(state.visits)

export const getFrequentSpots = createSelector(
  getFrequentSpotsIds,
  getSpots,
  (frequentSpotsIds, spots) => frequentSpotsIds.map(id => spots.find(spot => spot._id === id))
)
