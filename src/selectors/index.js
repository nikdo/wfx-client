import moment from 'moment-timezone'
import { pipe } from 'functional'
/* Source: https://github.com/umpirsky/country-list/blob/master/data/en_US/country.json */
import countries from './countries.json'
import roundHours from './roundHours'
import daylightToDarkness from './daylightToDarkness'

const setCountryName = spot => ({
  ...spot,
  country: countries[spot.country]
})

const roundDaylight = spot => ({
  ...spot,
  weather: {
    ...spot.weather,
    daylight: spot.weather.daylight.map(day => ({
      sunriseTime: roundHours(day.sunriseTime),
      sunsetTime: roundHours(day.sunsetTime)
    }))
  }
})

const setDaylightFlag = spot => ({
  ...spot,
  weather: {
    ...spot.weather,
    hourly: spot.weather.hourly.map(frame => ({
      ...frame,
      isDaylight: spot.weather.daylight.some(day =>
        day.sunriseTime <= frame.time &&
        frame.time <= day.sunsetTime
      )
    }))
  }
})

const setDarkness = spot => {
  const { daylight, ...weather } = spot.weather
  return {
    ...spot,
    weather: {
      ...weather,
      darkness: daylightToDarkness(daylight)
    }
  }
}

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
      darkness: spot.weather.darkness.map(night => ({
        start: night.start && setSpotTimezone(night.start),
        end: night.end && setSpotTimezone(night.end)
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
    applyTimezone
  )(spotDetail)
