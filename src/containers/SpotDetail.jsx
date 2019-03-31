import React from 'react'
import { connect } from 'react-redux'
import Detail from '../pages/Detail'

const SpotDetailContainer = ({ spotDetail }) => (
  spotDetail && <Detail spotDetail={spotDetail} />
)

const mapStateToProps = ({ spotDetail }) => ({ spotDetail })

export default connect(mapStateToProps)(SpotDetailContainer)
