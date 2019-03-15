const strip = str => str.trim().toLowerCase()

export default (spots, query) => {
  query = strip(query)
  return query.length
    ? spots.filter(spot => strip(spot.name).startsWith(query))
    : []
}
