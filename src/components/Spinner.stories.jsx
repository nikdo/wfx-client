import React from 'react'
import { storiesOf } from '@storybook/react'
import WhitespaceDecorator from '../../.storybook/WhitespaceDecorator'
import Spinner from './Spinner'

storiesOf('Spinner', module)
  .addDecorator(WhitespaceDecorator())
  .add('default', () => <Spinner />)
  .add('inline', () => <Spinner inline />)

storiesOf('Spinner', module)
  .addDecorator(WhitespaceDecorator({ inverted: true }))
  .add('inverted', () => <Spinner inline inverted />)
