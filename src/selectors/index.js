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

const isInRange = (min, max) => item => min < item && item < max
const trimDarkness = spot => {
  const hours = spot.weather.hourly.map(frame => frame.time)
  const isWithinHourlyForecast = isInRange(hours[0], hours[hours.length - 1])
  return {
    ...spot,
    weather: {
      ...spot.weather,
      darkness: spot.weather.darkness
        .map(({ start, end }) => ({
          ...(isWithinHourlyForecast(start) && { start }),
          ...(isWithinHourlyForecast(end) && { end })
        }))
        .filter(night => Object.keys(night).length)
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
