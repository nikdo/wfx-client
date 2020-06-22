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

  handleChange = (event, { newValue }) => {
    this.props.onChange(newValue)
  }

  handleFocus = () => {
    this.setState({
      focused: true
    })
  }

  handleBlur = () => {
    this.setState({
      focused: false
    })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.input.blur()
      this.handleCancel()
    }
  }

  handleCancel = () => {
    this.props.onChange('')
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: searchSpot(this.props.spots, value)
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleSuggestionSelected = (event, { suggestion }) => {
    this.input.blur()
    this.props.onSpotSelected(suggestion._id)
  }

  render () {
    const { suggestions, focused } = this.state
    const { query, spotLoading, autoFocus, fat, className } = this.props

    const inputProps = {
      placeholder: fat ? 'Find spot' : undefined,
      value: query,
      disabled: spotLoading,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown,
      autoFocus: autoFocus,
      spellCheck: false
    }

    const spaceHolderClassNames = classNames({
      [styles.spaceHolder]: true,
      [styles.fat]: fat,
      [styles.focused]: focused,
      [className]: className
    })

    return (
      <div className={spaceHolderClassNames}>
        <Autosuggest
          ref={autosuggest => {
            if (autosuggest !== null) {
              this.input = autosuggest.input
            }
          }}
          highlightFirstSuggestion
          focusInputOnSuggestionClick={false}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          onSuggestionSelected={this.handleSuggestionSelected}
          suggestions={suggestions}
          getSuggestionValue={getSuggestionValue}
          inputProps={inputProps}
          renderInputComponent={inputProps => (
            <SearchInput
              fat={fat}
              spotLoading={this.props.spotLoading}
              showSearchIcon={!query.length}
              onSearchClick={() => this.input.focus()}
              onCancelClick={this.handleCancel}
              inputProps={inputProps}
            />
          )}
          renderSuggestion={spot => <SearchSuggestion spot={spot} />}
          theme={styles}
        />
      </div>
    )
  }
}
