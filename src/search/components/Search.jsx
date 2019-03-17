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
    this.state = {
      suggestions: [],
      focused: false
    }
  }

  onChange = (event, { newValue }) => {
    this.props.onChange(newValue)
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  onCancel = () => {
    this.props.onChange('')
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
    const { suggestions, focused } = this.state
    const { query, spotLoading, autoFocus, fat } = this.props

    const inputProps = {
      placeholder: fat ? 'Find spot' : undefined,
      value: query,
      disabled: spotLoading,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      autoFocus: autoFocus,
      spellCheck: false
    }

    const spaceHolderClassNames = classNames({
      [styles.spaceHolder]: true,
      [styles.fat]: fat,
      [styles.focused]: focused
    })

    return <div className={spaceHolderClassNames}>
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
          onSearchClick={() => this.input.focus()}
          onCancelClick={this.onCancel}
          inputProps={inputProps} />
        }
        renderSuggestion={spot => <SearchSuggestion spot={spot} />}
        theme={styles}
      />
    </div>
  }
}
