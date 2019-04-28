import React from 'react'
import { storiesOf } from '@storybook/react'
import WhitespaceDecorator from '../../.storybook/WhitespaceDecorator'
import Footer from './Footer'

storiesOf('Footer', module)
  .addDecorator(WhitespaceDecorator({ inverted: true }))
  .add('default', () => <Footer />)
