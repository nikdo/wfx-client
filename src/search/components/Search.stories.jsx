import React from 'react'
import { action } from '@storybook/addon-actions'
import Search from './Search'

const defaultProps = {
  spots: [],
  query: 'la',
  onChange: action('onChange')
}

export default {
  title: 'Search',
  parameters: {
    backgrounds: { default: 'gradient' }
  }
}

export const SlimEmpty = () => <Search {...defaultProps} query='' />
export const SlimQuery = () => <Search {...defaultProps} autoFocus />
export const SlimLoading = () => <Search {...defaultProps} query='Agios Nikolaos' spotLoading />

export const FatEmpty = () => <Search {...defaultProps} fat query='' />
export const FatQuery = () => <Search {...defaultProps} fat autoFocus />
export const FatLoading = () => <Search {...defaultProps} fat query='Agios Nikolaos' spotLoading />
