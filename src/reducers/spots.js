export default (state = [], action) => {
  switch (action.type) {
    case 'SPOT_LIST_COMPLETED':
      return action.payload
    default:
      return state
  }
}
