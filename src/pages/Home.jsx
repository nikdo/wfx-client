import React, { Component } from 'react'

const getSuggestions = (spots, query) => {
  query = query.trim().toLowerCase()
  return query.length
    ? spots.filter(spot => spot.name.toLowerCase().startsWith(query))
    : []
}

export default class Home extends Component {
  constructor () {
    super()
    this.state = { query: '' }
  }

  handleChange = event => {
    this.setState({ query: event.target.value })
  }

  render () {
    return <>
      <input type='text' value={this.state.query} onChange={this.handleChange} />
      <ul>
        {getSuggestions(this.props.spots, this.state.query).map(spot =>
          <li onClick={() => this.props.onSpotSelected(spot._id)}>
            {spot.name}
          </li>
        )}
      </ul>
    </>
  }
}
