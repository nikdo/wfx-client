import { getFrequentSpotsIds } from './selectors'

describe('getFrequentSpotsIds', () => {
  it('returns IDs of all visited spots', () => {
    const state = {
      visits: {
        12: [1598126063],
        13: [1578918720, 1579048320]
      }
    }
    expect(getFrequentSpotsIds(state)).toEqual(['12', '13'])
  })
})
