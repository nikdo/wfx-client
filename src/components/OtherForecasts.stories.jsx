import React from 'react'
import { storiesOf } from '@storybook/react'
import OtherForecasts from './OtherForecasts'

const defaultProps = {
  lat: 43.406544,
  lng: 4.589882
}

storiesOf('OtherForecasts', module)
  .add('default', () => <OtherForecasts {...defaultProps} />)
