import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    const { spotDetail, spotsLoaded } = this.props

    if (spotDetail) {
      return <>
        <Header />
        <Detail spotDetail={spotDetail} />
      </>
    } else if (spotsLoaded) {
      return <Header fullSize />
    } else {
      return <Spinner />
    }
  }
}

export default connect(({ spots, spotDetail }) => ({
  spotsLoaded: !!spots.length,
  spotDetail
}))(App)
