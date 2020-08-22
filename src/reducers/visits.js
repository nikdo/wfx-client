export default (state = {}, action) => {
  switch (action.type) {
    case 'SPOT_VISITED':
      return {
        ...state,
        [action.payload]: (state[action.payload] || 0) + 1
      }
    default:
      return state
  }
}
