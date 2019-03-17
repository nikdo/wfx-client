import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Search from './Search'

const WhitespaceDecorator = storyFn => <div style={{ margin: 24 }}>{storyFn()}</div>
addDecorator(WhitespaceDecorator)

const defaultProps = {
  spots: [],
  query: 'la',
  onChange: action('onChange')
}

storiesOf('Search', module)
  .add('empty', () => <Search {...defaultProps} query='' />)
  .add('query', () => <Search {...defaultProps} autoFocus />)
  .add('loading', () => <Search {...defaultProps} spotLoading />)
  .add('fat empty', () => <Search {...defaultProps} fat query='' />)
  .add('fat query', () => <Search {...defaultProps} fat autoFocus />)
  .add('fat loading', () => <Search {...defaultProps} fat spotLoading />)
