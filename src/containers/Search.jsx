import React, { Component } from 'react'
import Search from '../components/Search'

export default class SearchContainer extends Component {
  onChange = payload => {
    this.props.dispatch({ type: 'SEARCH_QUERY_CHANGE', payload })
  }

  render () {
    return <Search
      {...this.props}
      onChange={this.onChange} />
  }
}
