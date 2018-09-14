import React, { Component } from 'react'
import moment from 'moment'
import './App.css'

export default class App extends Component {
  constructor () {
    super()
    this.state = { forecasts: [] }
  }

  componentDidMount () {
    fetch('/data')
      .then(response => response.json())
      .then(forecasts => this.setState({ forecasts }))
  }

  renderForecast (forecast) {
    return <tr key={forecast.time.toString()}>
      <th>{moment(forecast.time).format('dd D.M. HH:mm')}</th>
      <td>{forecast.windSpeed}m/s</td>
      <td>{forecast.windGust}m/s</td>
      <td>{forecast.windBearing}</td>
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
        {this.state.forecasts.map(this.renderForecast)}
      </tbody>
    </table>
  }
}
