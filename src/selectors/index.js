import moment from 'moment-timezone'
import { pipe } from 'functional'
/* Source: https://github.com/umpirsky/country-list/blob/master/data/en_US/country.json */
import countries from './countries.json'
import {
  roundDaylight,
  setDaylightFlag,
  setDarkness,
  trimDarkness
} from './daylight'

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
      hourly: spot.weather.hourly.map(frame => ({
        ...frame,
        time: setSpotTimezone(frame.time)
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
    roundDaylight,
    setDaylightFlag,
    setDarkness,
    trimDarkness,
    applyTimezone
  )(spotDetail)
