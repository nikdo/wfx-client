import { createSelector } from 'reselect'
import { getSpots } from '../selectors'

const lastVisitsFirst = (a, b) => b.visits[b.visits.length - 1] - a.visits[a.visits.length - 1]

const moreVisitsFirst = (a, b) => b.visits.length - a.visits.length

export const getFrequentSpotsIds = state =>
  Object.keys(state.visits)
    .map(key => ({ id: key, visits: state.visits[key] }))
    .slice().sort(lastVisitsFirst)
    .slice().sort(moreVisitsFirst)
    .slice(0, 12)
    .map(spotVisits => spotVisits.id)

export const getFrequentSpots = createSelector(
  getFrequentSpotsIds,
  getSpots,
  (frequentSpotsIds, spots) => frequentSpotsIds.map(id => spots.find(spot => spot._id === id))
)
