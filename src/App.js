import React, { Component } from 'react'
import { createStore } from 'redux'
import moment from 'moment-timezone'
import rootReducer from './reducers'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Spinner from './components/Spinner'
/* Source: https://github.com/umpirsky/country-list/blob/master/data/en_US/country.json */
import countries from './countries.json'
import './global.css'

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
    windGust: Math.round(frame.windGust * 10) / 10
  }))
})

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      ...this.store.getState(),
      spots: [],
      spotLoading: false,
      spotDetail: null
    }
    this.store.subscribe(() => this.setState(this.store.getState()))
  }

  store = createStore(rootReducer)

  fetchData = () => {
    fetch(process.env.REACT_APP_API_URL + '/spots')
      .then(res => res.json())
      .then(spots => spots.map(countryCodeToCountry))
      .then(spots => {
        this.setState({ spots })
      })
  }

  fetchSpot = id => {
    const timeout = setTimeout(() => this.setState({ spotLoading: true }), 1000)
    fetch(process.env.REACT_APP_API_URL + `/spots/${id}`)
      .then(res => res.json())
      .then(deserializeSpot)
      .then(spot => {
        document.title = spot.name
        clearTimeout(timeout)
        this.store.dispatch({ type: 'SPOT_FETCH_COMPLETED' })
        this.setState({
          spotDetail: spot,
          spotLoading: false
        })
      })
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const { searchQuery, spotDetail, spots, spotLoading } = this.state

    if (spotDetail) {
      return <Detail
        query={searchQuery}
        dispatch={this.store.dispatch}
        spots={spots}
        spotLoading={spotLoading}
        spotDetail={spotDetail}
        fetchSpot={this.fetchSpot} />
    } else if (spots.length) {
      return <Home
        query={searchQuery}
        dispatch={this.store.dispatch}
        spots={spots}
        spotLoading={spotLoading}
        onSpotSelected={this.fetchSpot} />
    } else {
      return <Spinner />
    }
  }
}
