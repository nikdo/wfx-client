import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { fetchSpots } from './actions'
import Detail from './pages/Detail'
import Header from './components/Header'
import Spinner from './components/Spinner'
import './global.css'

class App extends Component {
  componentDidMount () {
    fetchSpots(this.props.dispatch)
  }

  render () {
    const { initialLoad, spotDetail } = this.props
    return initialLoad
      ? <Spinner />
      : <>
        <Header fullSize={!spotDetail} />
        <Route path='/:spotId' render={() =>
          spotDetail && <Detail spotDetail={spotDetail} />
        } />
      </>
  }
}

export default connect(({ spots, spotDetail }) => ({
  initialLoad: !spots.length && !spotDetail,
  spotDetail
}))(App)
