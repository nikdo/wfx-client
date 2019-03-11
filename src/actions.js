export const spotListCompleted = spots => ({
  type: 'SPOT_LIST_COMPLETED', payload: spots
})

export const spotFetchDelayed = () => ({
  type: 'SPOT_FETCH_DELAYED'
})

export const spotFetchCompleted = spot => ({
  type: 'SPOT_FETCH_COMPLETED', payload: spot
})
