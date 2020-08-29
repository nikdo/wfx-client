import React from 'react'
import Spinner from './Spinner'

export default {
  title: 'Spinner'
}

export const Default = () => <Spinner />
export const Inline = () => <Spinner inline />
export const Inverted = () => <Spinner inline inverted />
Inverted.parameters = {
  backgrounds: { default: 'gradient' }
}
