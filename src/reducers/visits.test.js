import visits from './visits'
import { spotVisited } from '../actions'

describe('visits reducer', () => {
  it('adds first visit date on SPOT_VISITED action', () => {
    const state = {}
    const action = spotVisited(42)
    const generatedDate = action.payload.date
    const result = visits(state, action)
    expect(result).toHaveProperty('42', [generatedDate])
  })

  it('appends a visit date on SPOT_VISITED action', () => {
    const recordedVisits = [1578918720, 1579048320]
    const state = {
      42: recordedVisits
    }
    const action = spotVisited(42)
    const generatedDate = action.payload.date
    const result = visits(state, action)
    expect(result).toHaveProperty('42', [...recordedVisits, generatedDate])
  })
})
