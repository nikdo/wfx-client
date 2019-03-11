import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSpots } from './actions'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Spinner from './components/Spinner'
import './global.css'

class App extends Component {
  componentDidMount () {
    fetchSpots(this.props.dispatch)
  }

  render () {
    const { spots, spotDetail } = this.props

    if (spotDetail) {
      return <Detail
        spotDetail={spotDetail} />
    } else if (spots.length) {
      return <Home />
    } else {
      return <Spinner />
    }
  }
}

export default connect(state => state)(App)
