import { pipe } from 'functional'
import {
  floorHour,
  ceilHour,
  getTimeMatchingFloored,
  getTimeMatchingCeiled
} from './roundHours'
import daylightToDarkness from './daylightToDarkness'

const getMatchingSunrise = daylight =>
  getTimeMatchingFloored(daylight.map(day => day.sunriseTime))
const getMatchingSunset = daylight =>
  getTimeMatchingCeiled(daylight.map(day => day.sunsetTime))

export const setFrameDaylight = daylight => frame => {
  const sunrise = getMatchingSunrise(daylight)(frame.time)
  const sunset = getMatchingSunset(daylight)(frame.time)
  return {
    ...frame,
    isDaylight: daylight.some(day =>
      floorHour(day.sunriseTime) < frame.time &&
      frame.time < ceilHour(day.sunsetTime)
    ),
    ...(sunrise && { sunrise }),
    ...(sunset && { sunset })
  }
}
export const setHourlyDaylight = weather => ({
  ...weather,
  hourly: weather.hourly.map(setFrameDaylight(weather.daylight))
})

const roundDaylight = days => days.map(day => ({
  sunriseTime: floorHour(day.sunriseTime),
  sunsetTime: ceilHour(day.sunsetTime)
}))

export const setDarkness = weather => {
  const { daylight, ...rest } = weather
  return {
    ...rest,
    darkness: pipe(
      roundDaylight,
      daylightToDarkness
    )(daylight)
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
  setHourlyDaylight,
  setDarkness,
  trimDarkness
)
