import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { fetchSpots } from './actions'
import SpotDetailContainer from './containers/SpotDetail'
import Header from './components/Header'
import Spinner from './components/Spinner'
import './global.css'

class App extends Component {
  componentDidMount () {
    fetchSpots(this.props.dispatch)
  }

  render () {
    return this.props.initialLoad
      ? <Spinner />
      : (
        <>
          <Header />
          <Route path='/:spotId'>
            <SpotDetailContainer />
          </Route>
        </>
      )
  }
}

export default connect(({ spots, spotDetail }) => ({
  initialLoad: !spots.length && !spotDetail
}))(App)
