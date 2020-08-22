export const spotListCompleted = spots => ({
  type: 'SPOT_LIST_COMPLETED',
  payload: spots
})

export const spotFetchDelayed = () => ({
  type: 'SPOT_FETCH_DELAYED'
})

export const spotFetchCompleted = spot => ({
  type: 'SPOT_FETCH_COMPLETED',
  payload: spot
})

export const spotVisited = id => ({
  type: 'SPOT_VISITED',
  payload: id
})

export const fetchSpots = dispatch => {
  fetch(process.env.REACT_APP_API_URL + '/spots')
    .then(res => res.json())
    .then(spots => {
      dispatch(spotListCompleted(spots))
    })
}

export const fetchSpotDetail = (dispatch, id) => {
  dispatch(spotVisited(id))
  const timeout = setTimeout(
    () => dispatch(spotFetchDelayed()),
    1000
  )
  return fetch(process.env.REACT_APP_API_URL + `/spots/${id}`)
    .then(res => res.json())
    .then(spot => {
      clearTimeout(timeout)
      dispatch(spotFetchCompleted(spot))
    })
}
