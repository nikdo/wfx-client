import moment from 'moment-timezone'
import history from './history'
import roundHours from './roundHours'
/* Source: https://github.com/umpirsky/country-list/blob/master/data/en_US/country.json */
import countries from './countries.json'

const countryCodeToCountry = spot => ({
  ...spot,
  country: countries[spot.country]
})

const deserializeSpot = spot => ({
  ...countryCodeToCountry(spot),
  forecast: spot.forecast.map(frame => ({
    ...frame,
    time: moment.unix(frame.time).tz(spot.timezone),
    windSpeed: Math.round(frame.windSpeed * 10) / 10,
    windGust: Math.round(frame.windGust * 10) / 10,
    isDaylight: spot.daylight
      .map(day => ({
        sunriseTime: roundHours(day.sunriseTime),
        sunsetTime: roundHours(day.sunsetTime)
      }))
      .some(day =>
        day.sunriseTime <= frame.time &&
        frame.time <= day.sunsetTime
      )
  })),
  forecasts: spot.forecasts || {}
})

export const spotListCompleted = spots => ({
  type: 'SPOT_LIST_COMPLETED',
  payload: spots
})

export const spotFetchDelayed = () => ({
  type: 'SPOT_FETCH_DELAYED'
})

export const spotFetchCompleted = spot => ({
  type: 'SPOT_FETCH_COMPLETED',
  payload: spot
})

export const fetchSpots = dispatch => {
  fetch(process.env.REACT_APP_API_URL + '/spots')
    .then(res => res.json())
    .then(spots => spots.map(countryCodeToCountry))
    .then(spots => {
      dispatch(spotListCompleted(spots))
    })
}

export const fetchSpotDetail = (dispatch, id) => {
  const timeout = setTimeout(
    () => dispatch(spotFetchDelayed()),
    1000
  )
  fetch(process.env.REACT_APP_API_URL + `/spots/${id}`)
    .then(res => res.json())
    .then(deserializeSpot)
    .then(spot => {
      document.title = spot.name
      clearTimeout(timeout)
      dispatch(spotFetchCompleted(spot))
      history.push(`/${spot._id}`)
    })
}
