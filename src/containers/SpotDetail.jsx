import React from 'react'
import { connect } from 'react-redux'
import Spinner from '../components/Spinner'
import Detail from '../pages/Detail'

const SpotDetailContainer = ({ spotDetail }) => (
  spotDetail
    ? <Detail spotDetail={spotDetail} />
    : <Spinner />
)

const mapStateToProps = ({ spotDetail }) => ({ spotDetail })

export default connect(mapStateToProps)(SpotDetailContainer)
