import React, { Component } from 'react'
import moment from 'moment-timezone'
import Chart from './components/Chart'
import ForecastTable from './components/ForecastTable'
import Spinner from './components/Spinner'
import './App.css'

export default class App extends Component {
  componentDidMount () {
    fetch('/data')
      .then(res => res.json())
      .then(spot => ({
        ...spot,
        forecast: spot.forecast.map(frame => ({
          ...frame,
          time: moment.unix(frame.time).tz(spot.timezone)
        }))
      }))
      .then(spot => {
        document.title = spot.name
        this.setState(spot)
      })
  }

  render () {
    return <main>
      {this.state
        ? <div>
          <h1>{this.state.name}</h1>
          <Chart forecast={this.state.forecast} />
          <ForecastTable forecast={this.state.forecast} />
        </div>
        : <Spinner />
      }
    </main>
  }
}
