import React, { Component } from 'react'
import { connect } from 'react-redux'
import Search from '../components/Search'

class SearchContainer extends Component {
  onChange = payload => {
    this.props.dispatch({ type: 'SEARCH_QUERY_CHANGE', payload })
  }

  render () {
    const { spots, searchQuery, onSpotSelected, spotLoading } = this.props
    return <Search
      onSpotSelected={onSpotSelected}
      spots={spots}
      query={searchQuery}
      spotLoading={spotLoading}
      onChange={this.onChange} />
  }
}

export default connect(state => state)(SearchContainer)
