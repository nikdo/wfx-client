import React from 'react'

export default ({ inverted } = { inverted: false }) => storyFn => {
  const style = {
    padding: 24,
    background: inverted
      ? `linear-gradient(
        120deg,
        hsla(239, 35%, 51%, 0.83),
        hsla(219, 44%, 50%, 0.83) 70%
      )`
      : 'transparent'
  }
  return <div style={style}>{storyFn()}</div>
}
