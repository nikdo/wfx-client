import React from 'react'
import ReactDOM from 'react-dom'
import Selector from './Selector'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Selector value='Boo' spots={[]} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
