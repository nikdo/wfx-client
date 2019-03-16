export const searchQueryChange = query => ({
  type: 'SEARCH_QUERY_CHANGE',
  payload: query
})

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
