import React, { Component } from 'react'

const search = (spots, query) => spots
  .filter(spot => spot.name.toLowerCase().startsWith(query.trim().toLowerCase()))

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
        {search(this.props.spots, this.state.query).map(spot =>
          <li onClick={() => this.props.onSpotSelected(spot._id)}>
            {spot.name}
          </li>
        )}
      </ul>
    </>
  }
}
