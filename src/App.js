import React, { Component } from 'react'
import moment from 'moment-timezone'
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
      spots: [],
      selectedSpotId: null,
      spotLoading: false,
      spotDetail: null
    }
  }

  fetchData () {
    fetch(process.env.REACT_APP_API_URL + '/spots')
      .then(res => res.json())
      .then(spots => spots.map(countryCodeToCountry))
      .then(spots => {
        this.setState({ spots })
      })
  }

  fetchSpot (id) {
    this.setState({ selectedSpotId: id })
    const timeout = setTimeout(() => this.setState({ spotLoading: true }), 1000)
    fetch(process.env.REACT_APP_API_URL + `/spots/${id}`)
      .then(res => res.json())
      .then(deserializeSpot)
      .then(spot => {
        document.title = spot.name
        clearTimeout(timeout)
        this.setState({ spotDetail: spot, spotLoading: false })
      })
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    if (this.state.spotDetail) {
      return <Detail
        spots={this.state.spots}
        selectedSpotId={this.state.selectedSpotId}
        spotLoading={this.state.spotLoading}
        spotDetail={this.state.spotDetail}
        fetchSpot={this.fetchSpot} />
    } else if (this.state.spots.length) {
      return <Home
        onSpotSelected={() => this.fetchSpot(this.state.spots[0]._id)} />
    } else {
      return <Spinner />
    }
  }
}
