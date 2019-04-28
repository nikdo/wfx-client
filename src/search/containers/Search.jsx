import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSpotDetail } from 'actions'
import { searchQueryChange } from '../reducer'
import Search from '../components/Search'

class SearchContainer extends Component {
  render () {
    const { autoFocus, fat, className, spots, searchQuery, spotLoading } = this.props
    return <Search
      autoFocus={autoFocus}
      fat={fat}
      className={className}
      onSpotSelected={id => fetchSpotDetail(this.props.dispatch, id)}
      spots={spots}
      query={searchQuery}
      spotLoading={spotLoading}
      onChange={query => this.props.dispatch(searchQueryChange(query))} />
  }
}

export default connect(state => state)(SearchContainer)
