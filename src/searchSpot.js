const strip = str => str.trim().toLowerCase()
  // https://stackoverflow.com/a/37511463/5763764
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export default (spots, query) => {
  query = strip(query)
  return query.length
    ? spots.filter(spot => strip(spot.name).startsWith(query))
    : []
}
