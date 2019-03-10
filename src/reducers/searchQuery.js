export default (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_QUERY_CHANGE':
      return action.payload
    case 'SPOT_FETCH_COMPLETED':
      return ''
    default:
      return state
  }
}
