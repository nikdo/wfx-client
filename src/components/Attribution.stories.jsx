import React from 'react'
import { storiesOf } from '@storybook/react'
import WhitespaceDecorator from '../../.storybook/WhitespaceDecorator'
import Attribution from './Attribution'

storiesOf('Attribution', module)
  .addDecorator(WhitespaceDecorator({ inverted: true }))
  .add('default', () => <Attribution />)
