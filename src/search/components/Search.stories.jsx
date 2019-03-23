import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Search from './Search'

const WhitespaceDecorator = (gradient = false) => storyFn => {
  const style = {
    padding: 24,
    background: gradient
      ? `linear-gradient(
        120deg,
        hsla(239, 35%, 51%, 0.83),
        hsla(219, 44%, 50%, 0.83) 70%
      )`
      : 'transparent'
  }
  return <div style={style}>{storyFn()}</div>
}

const TransparentDecorator = WhitespaceDecorator()
const GradientDecorator = WhitespaceDecorator(true)

const defaultProps = {
  spots: [],
  query: 'la',
  onChange: action('onChange')
}

storiesOf('Search', module)
  .addDecorator(TransparentDecorator)
  .add('empty', () => <Search {...defaultProps} query='' />)
  .add('query', () => <Search {...defaultProps} autoFocus />)
  .add('loading', () => <Search {...defaultProps} spotLoading />)

storiesOf('Search/fat', module)
  .addDecorator(GradientDecorator)
  .add('empty', () => <Search {...defaultProps} fat query='' />)
  .add('query', () => <Search {...defaultProps} fat autoFocus />)
  .add('loading', () => <Search {...defaultProps} fat spotLoading />)
