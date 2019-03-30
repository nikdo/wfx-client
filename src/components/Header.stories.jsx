import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './Header'
import ProviderDecorator from '../../.storybook/ProviderDecorator'

storiesOf('Header', module)
  .addDecorator(ProviderDecorator)
  .add('top', () => <Header />)
  .add('fullSize', () => <Header fullSize />)
