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
      options: []
    }
  }

  fetchOptions () {
    fetch('/api/spots')
      .then(res => res.json())
      .then(options => this.setState({ options }))
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
    this.fetchOptions()
    this.fetchSpot('5616a1ca0ef5750a55ee0893')
  }

  render () {
    return <main>
      {this.state.spot && this.state.options.length
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
