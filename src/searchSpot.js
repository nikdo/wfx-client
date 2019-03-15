import match from 'autosuggest-highlight/match'

export default (spots, query) => spots
  .map(spot => ({ ...spot, nameMatches: match(spot.name, query) }))
  .filter(spot => spot.nameMatches.length)
