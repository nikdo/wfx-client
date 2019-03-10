import React, { Component } from 'react'
import { connect } from 'react-redux'
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

class App extends Component {
  constructor () {
    super()
    this.state = {
      spots: []
    }
  }

  fetchData = () => {
    fetch(process.env.REACT_APP_API_URL + '/spots')
      .then(res => res.json())
      .then(spots => spots.map(countryCodeToCountry))
      .then(spots => {
        this.setState({ spots })
      })
  }

  fetchSpot = id => {
    const timeout = setTimeout(
      () => this.props.dispatch({ type: 'SPOT_FETCH_DELAYED' }),
      1000
    )
    fetch(process.env.REACT_APP_API_URL + `/spots/${id}`)
      .then(res => res.json())
      .then(deserializeSpot)
      .then(spot => {
        document.title = spot.name
        clearTimeout(timeout)
        this.props.dispatch({ type: 'SPOT_FETCH_COMPLETED', payload: spot })
      })
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const { spotDetail } = this.props
    const { spots } = this.state

    if (spotDetail) {
      return <Detail
        spots={spots}
        spotDetail={spotDetail}
        fetchSpot={this.fetchSpot} />
    } else if (spots.length) {
      return <Home
        spots={spots}
        onSpotSelected={this.fetchSpot} />
    } else {
      return <Spinner />
    }
  }
}

export default connect(state => state)(App)
