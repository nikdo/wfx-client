import React from 'react'
import OtherForecasts from './OtherForecasts'

const defaultProps = {
  lat: 43.406544,
  lng: 4.589882
}

export default {
  title: 'Other Forecasts'
}

export const All = () => (
  <OtherForecasts {...defaultProps} windguruId='48606' windfinderId='beauduc' />
)

export const Single = () => <OtherForecasts {...defaultProps} />
