import roundHours from './roundHours'
import daylightToDarkness from './daylightToDarkness'

// TODO: do not pass whole spot
// TODO: test
// TODO: refactor rounddaylight and do not use it for pre-processing

export const roundDaylight = spot => ({
  ...spot,
  weather: {
    ...spot.weather,
    daylight: spot.weather.daylight.map(day => ({
      sunriseTime: roundHours(day.sunriseTime),
      sunsetTime: roundHours(day.sunsetTime)
    }))
  }
})

export const setDaylightFlag = spot => ({
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

export const setDarkness = spot => {
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
export const trimDarkness = spot => {
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
