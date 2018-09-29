import React, { Component } from 'react'
import moment from 'moment-timezone'
import Selector from './components/Selector'
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
      spot: null,
      options: ['Podersdorf', 'Medulin', 'Tarifa']
    }
  }

  fetchSpot (id) {
    fetch(`/api/forecast/${id}`)
      .then(res => res.json())
      .then(deserialize)
      .then(spot => {
        document.title = spot.name
        this.setState({ spot: spot })
      })
  }

  componentDidMount () {
    this.fetchSpot(0)
  }

  render () {
    return <main>
      {this.state.spot
        ? <div>
          <Selector options={this.state.options} onChange={e => this.fetchSpot(e.target.value)} />
          <h1>{this.state.spot.name}</h1>
          <Chart forecast={this.state.spot.forecast} />
        </div>
        : <Spinner />
      }
    </main>
  }
}
