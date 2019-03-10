export default (state = null, action) => {
  switch (action.type) {
    case 'SPOT_FETCH_COMPLETED':
      return action.payload
    default:
      return state
  }
}
