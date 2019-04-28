import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import Header from './Header'
import ProviderDecorator from '../../.storybook/ProviderDecorator'

storiesOf('Header', module)
  .addDecorator(StoryRouter())
  .addDecorator(ProviderDecorator)
  .add('top', () => <Header />)
  .add('fullSize', () => <Header fullSize />)
