import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

export const nameMatchesFirst = (a, b) => {
  if (a.nameMatches.length && !b.nameMatches.length) {
    return -1
  }
  if (!a.nameMatches.length && b.nameMatches.length) {
    return 1
  }
  return 0
}

const numberOfStartMatches = matches =>
  matches.length && matches[0][0] === 0 ? 1 : 0

export const startMatchesFirst = getMatches => (a, b) =>
  numberOfStartMatches(getMatches(b)) - numberOfStartMatches(getMatches(a))

export const moreMatchesFirst = getMatchesCount => (a, b) =>
  getMatchesCount(b) - getMatchesCount(a)

export default (spots, query) => spots
  .map(spot => ({
    ...spot,
    nameMatches: match(spot.name, query),
    regionMatches: match(spot.region, query)
  }))
  .filter(spot => spot.nameMatches.length || spot.regionMatches.length)
  .slice().sort(startMatchesFirst(spot => spot.regionMatches))
  .slice().sort(startMatchesFirst(spot => spot.nameMatches))
  .slice().sort(nameMatchesFirst)
  .slice().sort(moreMatchesFirst(spot => Math.max(spot.regionMatches.length, spot.nameMatches.length)))
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
