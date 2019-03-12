export default (state = false, action) => {
  switch (action.type) {
    case 'SPOT_FETCH_DELAYED':
      return true
    case 'SPOT_FETCH_COMPLETED':
      return false
    default:
      return state
  }
}
