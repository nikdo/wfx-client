import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

export default (spots, query) => spots
  .map(spot => ({
    ...spot,
    nameMatches: match(spot.name, query)
  }))
  .map(spot => ({
    ...spot,
    regionMatches: spot.nameMatches.length ? [] : match(spot.region, query)
  }))
  .filter(spot => spot.nameMatches.length || spot.regionMatches.length)
  .slice().sort((a, b) => {
    if (a.nameMatches.length && !b.nameMatches.length) {
      return -1
    }
    if (!a.nameMatches.length && b.nameMatches.length) {
      return 1
    }
    return 0
  })
  .map(spotWithMatches => {
    const { nameMatches, ...spot } = spotWithMatches
    return {
      ...spot,
      nameFragments: parse(spot.name, nameMatches)
    }
  })
  .map(spotWithMatches => {
    const { regionMatches, ...spot } = spotWithMatches
    return spot.region
      ? {
        ...spot,
        regionFragments: parse(spot.region, regionMatches)
      }
      : spot
  })
