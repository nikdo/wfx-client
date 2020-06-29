import { pipe } from 'functional'
import roundHours from './roundHours'
import daylightToDarkness from './daylightToDarkness'

export const getMatchingSunrise = daylight => time =>
  daylight
    .map(day => day.sunriseTime)
    .find(sunriseTime => time === roundHours(sunriseTime))

export const setFrameDaylight = daylight => frame => {
  const sunrise = getMatchingSunrise(daylight)(frame.time)
  return {
    ...frame,
    isDaylight: daylight.some(day =>
      roundHours(day.sunriseTime) < frame.time &&
      frame.time < roundHours(day.sunsetTime)
    ),
    ...(sunrise && { sunrise })
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
