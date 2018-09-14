import React, { Component } from 'react'
import moment from 'moment'
import './App.css'

export default class App extends Component {
  constructor () {
    super()
    this.state = { forecast: [] }
  }

  componentDidMount () {
    fetch('/data')
      .then(res => res.json())
      .then(spot => {
        document.title = spot.name
        this.setState({ forecast: spot.forecast })
      })
  }

  renderFrame (frame) {
    return <tr key={frame.time.toString()}>
      <th>{moment(frame.time).format('dd D.M. HH:mm')}</th>
      <td>{frame.windSpeed}m/s</td>
      <td>{frame.windGust}m/s</td>
      <td>{frame.windBearing}</td>
    </tr>
  }

  render () {
    return <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Wind speed</th>
          <th>Wind gusts</th>
          <th>Wind direction</th>
        </tr>
      </thead>
      <tbody>
        {this.state.forecast.map(this.renderFrame)}
      </tbody>
    </table>
  }
}
