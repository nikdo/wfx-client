import React from 'react'
import StoryRouter from 'storybook-react-router'
import Logo from './Logo'

export default {
  title: 'Logo',
  decorators: [StoryRouter()],
  parameters: {
    backgrounds: { default: 'gradient' }
  }
}

export const Fat = () => <Logo fat />
export const Slim = () => <Logo />
