import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import WhitespaceDecorator from '../../../.storybook/WhitespaceDecorator'
import Search from './Search'

const defaultProps = {
  spots: [],
  query: 'la',
  onChange: action('onChange')
}

storiesOf('Search', module)
  .addDecorator(WhitespaceDecorator({ inverted: true }))
  .add('empty', () => <Search {...defaultProps} query='' />)
  .add('query', () => <Search {...defaultProps} autoFocus />)
  .add('loading', () => <Search {...defaultProps} query='Agios Nikolaos' spotLoading />)

storiesOf('Search/fat', module)
  .addDecorator(WhitespaceDecorator({ inverted: true }))
  .add('empty', () => <Search {...defaultProps} fat query='' />)
  .add('query', () => <Search {...defaultProps} fat autoFocus />)
  .add('loading', () => <Search {...defaultProps} fat query='Agios Nikolaos' spotLoading />)
