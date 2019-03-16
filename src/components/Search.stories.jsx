import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Search from './Search'

const WhitespaceDecorator = storyFn => <div style={{ margin: 24 }}>{storyFn()}</div>
addDecorator(WhitespaceDecorator)

storiesOf('Search', module)
  .add('empty', () => <Search fat spots={[]} query='' />)
