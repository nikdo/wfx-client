import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSpotDetail, searchQueryChange } from '../actions'
import Search from '../components/Search'

class SearchContainer extends Component {
  render () {
    const { spots, searchQuery, spotLoading } = this.props
    return <Search
      onSpotSelected={id => fetchSpotDetail(this.props.dispatch, id)}
      spots={spots}
      query={searchQuery}
      spotLoading={spotLoading}
      onChange={query => this.props.dispatch(searchQueryChange(query))} />
  }
}

export default connect(state => state)(SearchContainer)
