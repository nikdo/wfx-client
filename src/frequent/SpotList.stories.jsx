import React from 'react'
import StoryRouter from 'storybook-react-router'
import VerticalRhythmDecorator from '../../.storybook/VerticalRhythmDecorator'
import SpotList from './SpotList'

export default {
  title: 'SpotList',
  decorators: [StoryRouter(), VerticalRhythmDecorator],
  parameters: {
    backgrounds: { default: 'gradient' }
  }
}

const Template = args => <SpotList {...args} />

export const Full = Template.bind({})
Full.args = {
  spots: [
    {
      _id: '54f54e7f4509b82452437dc2',
      name: 'Wiek',
      region: 'Rügen',
      country: 'Germany'
    },
    {
      _id: '5616a8f10ef5750a55ee089a',
      name: 'Dranske',
      region: 'Rügen',
      country: 'Germany'
    },
    {
      _id: '5d15194a738ed92144e8e5d5',
      name: 'Saal',
      country: 'Germany'
    },
    {
      _id: '5616a2b00ef5750a55ee0894',
      name: 'Podersdorf',
      region: 'Neusiedler See',
      country: 'Austria'
    },
    {
      _id: '54f54e7d4509b82452437d56',
      name: 'Agios Nikolaos',
      region: 'Lefkada',
      country: 'Greece'
    },
    {
      _id: '54f54e7f4509b82452437d84',
      name: 'Vasiliki',
      region: 'Lefkada',
      country: 'Greece'
    },
    {
      _id: '54f54e7f4509b82452437d67',
      name: 'Dahab',
      country: 'Egypt'
    },
    {
      _id: '54f54e7f4509b82452437d9a',
      name: 'Opaťák',
      country: 'Czechia'
    },
    {
      _id: '5d15193d738ed92144e8e5d1',
      name: 'Born',
      country: 'Germany'
    },
    {
      _id: '5616a87e0ef5750a55ee0899',
      name: 'Rosengarten',
      region: 'Rügen',
      country: 'Germany'
    },
    {
      _id: '5616a8150ef5750a55ee0898',
      name: 'Suhrendorf',
      region: 'Rügen',
      country: 'Germany'
    },
    {
      _id: '561242e00ef5750a55ee0860',
      name: 'Milada',
      country: 'Czechia'
    }
  ]
}

export const Few = Template.bind({})
Few.args = { spots: Full.args.spots.slice(0, 7) }

export const Single = Template.bind({})
Single.args = { spots: Full.args.spots.slice(0, 1) }
