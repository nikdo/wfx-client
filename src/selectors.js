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

export const daylightToDarkness = days => days
  ?.reduce((nights, day) => {
    const lastNight = nights[nights.length - 1]
    return [
      ...nights.splice(0, nights.length - 1),
      {
        ...lastNight,
        end: day.sunriseTime
      },
      {
        start: day.sunsetTime
      }
    ]
  }, [{}])

export const getSpots = state => state.spots.map(spot => ({
  ...spot,
  country: countries[spot.country]
}))
export const getSearchQuery = state => state.searchQuery
export const getSpotLoading = state => state.spotLoading

export const getSpot = state => {
  const daylightRounded = getSpotDaylightRounded(state)
  const darkness = daylightToDarkness(daylightRounded)
  const spot = state.spotDetail
  return spot && ({
    ...spot,
    country: countries[spot.country],
    weather: {
      ...spot.weather,
      hourly: spot.weather.hourly.map(frame => ({
        ...frame,
        time: moment.unix(frame.time).tz(spot.timezone),
        isDaylight: daylightRounded.some(day =>
          day.sunriseTime <= frame.time &&
          frame.time <= day.sunsetTime
        )
      })),
      darkness: darkness.map(night => ({
        start: night.start && moment.unix(night.start).tz(spot.timezone),
        end: night.end && moment.unix(night.end).tz(spot.timezone)
      }))
    }
  })
}
