import React, { Component } from 'react'

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
        {this.props.spots.map(spot =>
          <li onClick={() => this.props.onSpotSelected(spot._id)}>
            {spot.name}
          </li>
        )}
      </ul>
    </>
  }
}
