import { pipe } from 'functional'
import roundHours from './roundHours'
import daylightToDarkness from './daylightToDarkness'

// TODO: test
// TODO: refactor rounddaylight and do not use it for pre-processing

export const getRoundedDaylight = days => days.map(day => ({
  sunriseTime: roundHours(day.sunriseTime),
  sunsetTime: roundHours(day.sunsetTime)
}))

export const roundDaylight = weather => ({
  ...weather,
  daylight: getRoundedDaylight(weather.daylight)
})

export const setDaylightFlag = weather => ({
  ...weather,
  hourly: weather.hourly.map(frame => ({
    ...frame,
    // TODO: needs rounded daylight
    isDaylight: weather.daylight.some(day =>
      day.sunriseTime <= frame.time &&
      frame.time <= day.sunsetTime
    )
  }))
})

export const setDarkness = weather => {
  const { daylight, ...rest } = weather
  return {
    ...rest,
    // TODO: needs rounded daylight
    darkness: daylightToDarkness(daylight)
  }
}

const isInRange = (min, max) => item => min < item && item < max
export const trimDarkness = weather => {
  const hours = weather.hourly.map(frame => frame.time)
  const isWithinHourlyForecast = isInRange(hours[0], hours[hours.length - 1])
  return {
    ...weather,
    darkness: weather.darkness
      .map(({ start, end }) => ({
        ...(isWithinHourlyForecast(start) && { start }),
        ...(isWithinHourlyForecast(end) && { end })
      }))
      .filter(night => Object.keys(night).length)
  }
}

export default pipe(
  roundDaylight,
  setDaylightFlag,
  setDarkness,
  trimDarkness
)
