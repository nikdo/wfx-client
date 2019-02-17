import React, { Component } from 'react'
import moment from 'moment-timezone'
import Header from './components/Header'
import Chart from './components/Chart'
import Attribution from './components/Attribution'
import Spinner from './components/Spinner'
/* Source: https://github.com/umpirsky/country-list/blob/master/data/en_US/country.json */
import countries from './countries.json'
import './global.css'

const deserializeSpot = spot => ({
  ...spot,
  forecast: spot.forecast.map(frame => ({
    ...frame,
    time: moment.unix(frame.time).tz(spot.timezone),
    windSpeed: Math.round(frame.windSpeed * 10) / 10,
    windGust: Math.round(frame.windGust * 10) / 10
  }))
})

const countryCodeToCountry = spot => ({
  ...spot,
  country: countries[spot.country]
})

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      spots: [],
      spotLoading: false,
      spotDetail: null,
    }
  }

  fetchData () {
    fetch(process.env.REACT_APP_API_URL + '/spots')
      .then(res => res.json())
      .then(spots => spots.map(countryCodeToCountry))
      .then(spots => {
        this.fetchSpot(spots[0]._id)
        this.setState({ spots })
      })
  }

  fetchSpot (id) {
    this.setState({ spotLoading: true })
    fetch(process.env.REACT_APP_API_URL + `/spots/${id}`)
      .then(res => res.json())
      .then(deserializeSpot)
      .then(spot => {
        document.title = spot.name
        this.setState({ spotDetail: spot, spotLoading: false })
      })
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    return this.state.spotDetail && this.state.spots.length
      ? <>
        <Header
          spots={this.state.spots}
          selectedSpotId={this.state.spotDetail._id}
          onSpotSelected={id => this.fetchSpot(id)}
          spotLoading={this.state.spotLoading} />
        <main>
          <Chart spotId={this.state.spotDetail._id} forecast={this.state.spotDetail.forecast} />
          <Attribution />
        </main>
      </>
      : <Spinner />
  }
}
