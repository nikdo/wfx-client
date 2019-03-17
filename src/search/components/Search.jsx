import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'
import searchSpot from '../searchSpot'
import SearchInput from './SearchInput'
import SearchSuggestion from './SearchSuggestion'
import styles from './Search.module.css'

const getSuggestionValue = spot => spot.name

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

  render () {
    const { suggestions } = this.state
    const { query, spotLoading, autoFocus, fat } = this.props

    const inputProps = {
      placeholder: fat ? 'Find spot' : undefined,
      value: query,
      disabled: spotLoading,
      onChange: this.onChange,
      autoFocus: autoFocus,
      spellCheck: false
    }

    return <div className={classNames(styles.spaceHolder, { [styles.fat]: fat })}>
      <Autosuggest
        ref={autosuggest => {
          if (autosuggest !== null) {
            this.input = autosuggest.input
          }
        }}
        highlightFirstSuggestion
        focusInputOnSuggestionClick={false}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        suggestions={suggestions}
        getSuggestionValue={getSuggestionValue}
        inputProps={inputProps}
        renderInputComponent={inputProps => <SearchInput
          fat={fat}
          spotLoading={this.props.spotLoading}
          showSearchIcon={!query.length}
          onSearchIconClick={() => this.input.focus()}
          inputProps={inputProps} />
        }
        renderSuggestion={spot => <SearchSuggestion spot={spot} />}
        theme={styles}
      />
    </div>
  }
}
