import React, { Component } from 'react'
import ForecastTable from './components/ForecastTable'
import Spinner from './components/Spinner'
import './App.css'

export default class App extends Component {
  componentDidMount () {
    fetch('/data')
      .then(res => res.json())
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
          <ForecastTable forecast={this.state.forecast} />
        </div>
        : <Spinner />
      }
    </main>
  }
}
