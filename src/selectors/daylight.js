import { pipe } from 'functional'
import roundHours from './roundHours'
import daylightToDarkness from './daylightToDarkness'

export const getMatchingTime = list => query =>
  list.find(time => roundHours(time) === query)

const getMatchingSunrise = daylight =>
  getMatchingTime(daylight.map(day => day.sunriseTime))
const getMatchingSunset = daylight =>
  getMatchingTime(daylight.map(day => day.sunsetTime))

export const setFrameDaylight = daylight => frame => {
  const sunrise = getMatchingSunrise(daylight)(frame.time)
  const sunset = getMatchingSunset(daylight)(frame.time)
  return {
    ...frame,
    isDaylight: daylight.some(day =>
      roundHours(day.sunriseTime) < frame.time &&
      frame.time < roundHours(day.sunsetTime)
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
  sunriseTime: roundHours(day.sunriseTime),
  sunsetTime: roundHours(day.sunsetTime)
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
