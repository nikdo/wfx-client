export default (state = {}, action) => {
  switch (action.type) {
    case 'SPOT_VISITED': {
      const { id, date } = action.payload
      return {
        ...state,
        [id]: [...(state[id] ?? []), date]
      }
    }
    default:
      return state
  }
}
