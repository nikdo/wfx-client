import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import location from '../components/location'
import theme from './Home.module.css'

const getSuggestions = (spots, query) => {
  query = query.trim().toLowerCase()
  return query.length
    ? spots.filter(spot => spot.name.toLowerCase().startsWith(query))
    : []
}

const getSuggestionValue = spot => spot.name

const renderSuggestion = spot => <>
  <span>{spot.name}</span>
  {' '}
  <span>({location(spot)})</span>
</>

export default class Home extends Component {
  constructor () {
    super()
    this.state = { query: '', suggestions: [] }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      query: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this.props.spots, value)
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.onSpotSelected(suggestion._id)
  }

  render () {
    const { query, suggestions } = this.state

    const inputProps = {
      placeholder: 'Find spot',
      value: query,
      onChange: this.onChange
    }

    return <Autosuggest
      alwaysRenderSuggestions
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionSelected={this.onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={theme}
    />
  }
}
