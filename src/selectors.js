import moment from 'moment-timezone'
/* Source: https://github.com/umpirsky/country-list/blob/master/data/en_US/country.json */
import countries from './countries.json'
import roundHours from './roundHours'

const getSpotDaylightRounded = state =>
  state.spotDetail?.weather.daylight
    .map(day => ({
      sunriseTime: roundHours(day.sunriseTime),
      sunsetTime: roundHours(day.sunsetTime)
    }))

export const getSpots = state => state.spots.map(spot => ({
  ...spot,
  country: countries[spot.country]
}))
export const getSearchQuery = state => state.searchQuery
export const getSpotLoading = state => state.spotLoading

export const getSpot = state => {
  const daylight = getSpotDaylightRounded(state)
  const spot = state.spotDetail
  return spot && ({
    ...spot,
    country: countries[spot.country],
    weather: {
      ...spot.weather,
      hourly: spot.weather.hourly.map(frame => ({
        ...frame,
        time: moment.unix(frame.time).tz(spot.timezone),
        isDaylight: daylight.some(day =>
          day.sunriseTime <= frame.time &&
          frame.time <= day.sunsetTime
        )
      }))
    }
  })
}
