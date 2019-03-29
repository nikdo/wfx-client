import React from 'react'

export default ({ inverted } = { inverted: false }) => storyFn => {
  const style = {
    padding: 24,
    background: inverted
      ? `linear-gradient(
        120deg,
        #7172BA,
        #6586C3 70%
      )`
      : 'transparent'
  }
  return <div style={style}>{storyFn()}</div>
}
