import moment from 'moment-timezone'
import { pipe } from 'functional'
/* Source: https://github.com/umpirsky/country-list/blob/master/data/en_US/country.json */
import countries from './countries.json'
import transformDaylight from './daylight'

const setCountryName = spot => ({
  ...spot,
  country: countries[spot.country]
})

const setTimezone = timezone => time => moment.unix(time).tz(timezone)
const applyTimezone = spot => {
  const setSpotTimezone = setTimezone(spot.timezone)
  return {
    ...spot,
    weather: {
      ...spot.weather,
      hourly: spot.weather.hourly.map(({ time, sunrise, sunset, ...frame }) => ({
        ...frame,
        time: setSpotTimezone(time),
        ...(sunrise && { sunrise: setSpotTimezone(sunrise) }),
        ...(sunset && { sunset: setSpotTimezone(sunset) })
      })),
      darkness: spot.weather.darkness.map(({ start, end }) => ({
        ...(start && { start: setSpotTimezone(start) }),
        ...(end && { end: setSpotTimezone(end) })
      }))
    }
  }
}

export const getSpots = state => state.spots.map(setCountryName)
export const getSearchQuery = state => state.searchQuery
export const getSpotLoading = state => state.spotLoading

export const getSpotDetail = ({ spotDetail }) => spotDetail &&
  pipe(
    setCountryName,
    spot => ({
      ...spot,
      weather: transformDaylight(spot.weather)
    }),
    applyTimezone
  )(spotDetail)
