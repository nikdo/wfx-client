import React, { Component } from 'react'
import moment from 'moment-timezone'
import Chart from './components/Chart'
import Spinner from './components/Spinner'
import './App.css'

const deserialize = spot => ({
  ...spot,
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
      spot: null
    }
  }

  componentDidMount () {
    fetch('/api/forecast/0')
      .then(res => res.json())
      .then(deserialize)
      .then(spot => {
        document.title = spot.name
        this.setState({ spot: spot })
      })
  }

  render () {
    return <main>
      {this.state.spot
        ? <div>
          <h1>{this.state.spot.name}</h1>
          <Chart forecast={this.state.spot.forecast} />
        </div>
        : <Spinner />
      }
    </main>
  }
}
