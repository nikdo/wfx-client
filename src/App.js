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
      spots: [],
      spotLoading: false,
      spotDetail: null
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
    const timeout = setTimeout(() => this.setState({ spotLoading: true }), 1000)
    fetch(process.env.REACT_APP_API_URL + `/spots/${id}`)
      .then(res => res.json())
      .then(deserializeSpot)
      .then(spot => {
        document.title = spot.name
        clearTimeout(timeout)
        this.props.dispatch({ type: 'SPOT_FETCH_COMPLETED' })
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
    const { searchQuery, dispatch } = this.props
    const { spotDetail, spots, spotLoading } = this.state

    if (spotDetail) {
      return <Detail
        query={searchQuery}
        dispatch={dispatch}
        spots={spots}
        spotLoading={spotLoading}
        spotDetail={spotDetail}
        fetchSpot={this.fetchSpot} />
    } else if (spots.length) {
      return <Home
        query={searchQuery}
        dispatch={dispatch}
        spots={spots}
        spotLoading={spotLoading}
        onSpotSelected={this.fetchSpot} />
    } else {
      return <Spinner />
    }
  }
}

export default connect(state => state)(App)
