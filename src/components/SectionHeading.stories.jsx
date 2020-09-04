import React from 'react'
import SectionHeading from './SectionHeading'

export default {
  title: 'Section Heading',
  args: { text: 'Section Heading' }
}

const Template = args => <SectionHeading {...args} />

export const Default = Template.bind({})

export const Inverted = Template.bind({})
Inverted.args = { inverted: true }
Inverted.parameters = {
  backgrounds: { default: 'gradient' }
}
