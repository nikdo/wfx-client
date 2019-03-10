import React, { Component } from 'react'
import { connect } from 'react-redux'
import Search from '../components/Search'

class SearchContainer extends Component {
  onChange = payload => {
    this.props.dispatch({ type: 'SEARCH_QUERY_CHANGE', payload })
  }

  render () {
    return <Search
      {...this.props}
      query={this.props.searchQuery}
      spotLoading={this.props.spotLoading}
      onChange={this.onChange} />
  }
}

export default connect(state => state)(SearchContainer)
