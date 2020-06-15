import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSpotDetail } from 'actions'
import { getSpot } from 'selectors'
import Spinner from 'components/Spinner'
import SpotDetail from 'components/SpotDetail'

class SpotDetailContainer extends Component {
  componentDidMount () {
    const { spot, match, dispatch } = this.props
    if (!spot || spot._id !== match.params.spotId) {
      fetchSpotDetail(dispatch, match.params.spotId)
    }
  }

  render () {
    return this.props.spot
      ? <SpotDetail spot={this.props.spot} />
      : <Spinner />
  }
}

const mapStateToProps = state => ({
  spot: getSpot(state)
})

export default connect(mapStateToProps)(SpotDetailContainer)
