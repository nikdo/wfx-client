import match from 'autosuggest-highlight/match'

export default (spots, query) => spots.filter(spot => match(spot.name, query).length)
