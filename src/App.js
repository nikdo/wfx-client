import React, { Component } from 'react'
import moment from 'moment-timezone'
import Selector from './components/Selector'
import Chart from './components/Chart'
import Attribution from './components/Attribution'
import Spinner from './components/Spinner'
/* Source: https://github.com/umpirsky/country-list/blob/master/data/en_US/country.json */
import countries from './countries.json'
import './global.css'

const deserialize = spot => ({
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
      spot: null,
      options: []
    }
    this.handleSpotChange = this.handleSpotChange.bind(this)
  }

  fetchData () {
    fetch(process.env.REACT_APP_API_URL + '/spots')
      .then(res => res.json())
      .then(options => options.map(countryCodeToCountry))
      .then(options => {
        this.fetchSpot(options[0]._id)
        this.setState({ options })
      })
  }

  fetchSpot (id) {
    fetch(process.env.REACT_APP_API_URL + `/spots/${id}`)
      .then(res => res.json())
      .then(deserialize)
      .then(spot => {
        document.title = spot.name
        this.setState({ spot: spot })
      })
  }

  componentDidMount () {
    this.fetchData()
  }

  handleSpotChange (id) {
    this.fetchSpot(id)
  }

  render () {
    return this.state.spot && this.state.options.length
      ? <>
        <header>
          <Selector
            value={this.state.spot._id}
            spots={this.state.options}
            onChange={this.handleSpotChange}
          />
        </header>
        <main>
          <Chart spotId={this.state.spot._id} forecast={this.state.spot.forecast} />
          <Attribution />
        </main>
      </>
      : <Spinner />
  }
}
