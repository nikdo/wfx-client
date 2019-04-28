import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSpotDetail } from 'actions'
import Spinner from 'components/Spinner'
import SpotDetail from 'components/SpotDetail'

class SpotDetailContainer extends Component {
  componentDidMount () {
    const { spotDetail, match, dispatch } = this.props
    if (!spotDetail || spotDetail._id !== match.params.spotId) {
      fetchSpotDetail(dispatch, match.params.spotId)
    }
  }

  render () {
    return this.props.spotDetail
      ? <SpotDetail spotDetail={this.props.spotDetail} />
      : <Spinner />
  }
}

const mapStateToProps = ({ spotDetail }) => ({ spotDetail })

export default connect(mapStateToProps)(SpotDetailContainer)
