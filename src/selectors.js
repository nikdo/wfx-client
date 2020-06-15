import moment from 'moment-timezone'
import roundHours from './roundHours'

const getSpotDaylightRounded = state => state.spotDetail &&
  state.spotDetail.daylight
    .map(day => ({
      sunriseTime: roundHours(day.sunriseTime),
      sunsetTime: roundHours(day.sunsetTime)
    }))

export const getSpotDetail = state => {
  const daylight = getSpotDaylightRounded(state)
  const spot = state.spotDetail
  return spot && ({
    ...spot,
    forecast: spot.forecast.map(frame => ({
      ...frame,
      time: moment.unix(frame.time).tz(spot.timezone),
      isDaylight: daylight.some(day =>
        day.sunriseTime <= frame.time &&
        frame.time <= day.sunsetTime
      )
    }))
  })
}
