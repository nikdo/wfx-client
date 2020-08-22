export const getFrequentSpotsIds = state =>
  Object.keys(state.visits)

export const getFrequentSpots = getFrequentSpotsIds
