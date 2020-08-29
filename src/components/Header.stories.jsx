import React from 'react'
import StoryRouter from 'storybook-react-router'
import Header from './Header'
import ProviderDecorator from '../../.storybook/ProviderDecorator'

export default {
  title: 'Header',
  decorators: [StoryRouter(), ProviderDecorator]
}

export const Default = () => <Header />
