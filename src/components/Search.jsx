import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'
import parse from 'autosuggest-highlight/parse'
import searchSpot from '../searchSpot'
import location from '../components/location'
import Spinner from '../components/Spinner'
import styles from './Search.module.css'

const getSuggestionValue = spot => spot.name

const renderSuggestion = spot => <>
  <div>
    {parse(spot.name, spot.nameMatches).map((fragment, i) =>
      <span key={i} className={classNames({ [styles.highlight]: fragment.highlight })}>
        {fragment.text}
      </span>
    )}
  </div>
  <div className={styles.location}>{location(spot)}</div>
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
      suggestions: searchSpot(this.props.spots, value)
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
    const { query, spotLoading, autoFocus, fat } = this.props

    const inputProps = {
      placeholder: 'Find spot',
      value: query,
      disabled: spotLoading,
      onChange: this.onChange,
      autoFocus: autoFocus,
      spellCheck: false
    }

    return <div className={classNames(styles.spaceHolder, { [styles.fat]: fat })}>
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
