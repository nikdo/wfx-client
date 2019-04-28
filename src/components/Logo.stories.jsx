import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import WhitespaceDecorator from '../../.storybook/WhitespaceDecorator'
import Logo from './Logo'

storiesOf('Logo', module)
  .addDecorator(StoryRouter())
  .addDecorator(WhitespaceDecorator({ inverted: true }))
  .add('fat', () => <Logo fat />)
  .add('slim', () => <Logo />)
