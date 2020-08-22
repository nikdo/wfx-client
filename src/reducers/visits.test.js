import visits from './visits'
import { spotVisited } from '../actions'

describe('visits reducer', () => {
  it('adds a single visit when SPOT_VISITED action', () => {
    const state = {}
    const action = spotVisited(42)
    const result = visits(state, action)
    expect(result).toHaveProperty('42', 1)
  })

  it('increments visit count when SPOT_VISITED action', () => {
    const state = {
      42: 3
    }
    const action = spotVisited(42)
    const result = visits(state, action)
    expect(result).toHaveProperty('42', 4)
  })
})
