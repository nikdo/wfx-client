export default (spots, query) => {
  query = query.trim().toLowerCase()
  return query.length
    ? spots.filter(spot => spot.name.toLowerCase().startsWith(query))
    : []
}
