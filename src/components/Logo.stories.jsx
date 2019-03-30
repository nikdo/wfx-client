import React from 'react'
import { storiesOf } from '@storybook/react'
import WhitespaceDecorator from '../../.storybook/WhitespaceDecorator'
import Logo from './Logo'

storiesOf('Logo', module)
  .addDecorator(WhitespaceDecorator({ inverted: true }))
  .add('fat', () => <Logo />)
