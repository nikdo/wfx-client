import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import location from '../components/location'
import Spinner from '../components/Spinner'
import styles from './Search.module.css'

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

export default class Search extends Component {
  constructor () {
    super()
    this.state = { suggestions: [] }
  }

  onChange = (event, { newValue }) => {
    this.props.onChange(newValue)
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this.props.spots, value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.input.blur()
    this.props.onSpotSelected(suggestion._id)
  }

  renderInputComponent = inputProps => (
    <div className={styles.inputContainer}>
      <input {...inputProps} />
      {this.props.spotLoading &&
        <Spinner inline />
      }
    </div>
  )

  render () {
    const { suggestions } = this.state
    const { query, spotLoading, autoFocus } = this.props

    const inputProps = {
      placeholder: 'Find spot',
      value: query,
      disabled: spotLoading,
      onChange: this.onChange,
      autoFocus: autoFocus,
      spellCheck: false
    }

    return <div className={styles.spaceHolder}>
      <Autosuggest
        highlightFirstSuggestion
        ref={autosuggest => {
          if (autosuggest !== null) {
            this.input = autosuggest.input
          }
        }}
        focusInputOnSuggestionClick={false}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        renderInputComponent={this.renderInputComponent}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={styles}
      />
    </div>
  }
}
