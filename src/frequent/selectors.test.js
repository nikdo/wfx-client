import { getFrequentSpotsIds, getFrequentSpots } from './selectors'

describe('getFrequentSpotsIds', () => {
  it('returns IDs of all visited spots given 2 spots visited', () => {
    const state = {
      visits: {
        12: [1598126063],
        13: [1578918720]
      }
    }
    expect(getFrequentSpotsIds(state)).toEqual(['12', '13'])
  })

  it('sorts IDs by number of visits', () => {
    const state = {
      visits: {
        12: [1598126063],
        13: [1578918720, 1579048320, 1581624180],
        14: [1598129999, 1581589380]
      }
    }
    expect(getFrequentSpotsIds(state)).toEqual(['13', '14', '12'])
  })

  it('returns only first 12 IDs given more than 12 spots visited', () => {
    const state = {
      visits: {
        1: [1598126063],
        2: [1578918720],
        3: [1579048320],
        4: [1581624180],
        5: [1598129999],
        6: [1581589380],
        7: [1598126063],
        8: [1578918720],
        9: [1579048320],
        10: [1581624180],
        11: [1598129999],
        12: [1581589380],
        13: [1598126063],
        14: [1578918720]
      }
    }
    expect(getFrequentSpotsIds(state).length).toEqual(12)
  })
})

describe('getFrequentSpots', () => {
  it('returns all visited spots given 2 spots visited', () => {
    const state = {
      spots: [
        {
          _id: '12',
          name: 'Wiek',
          country: 'DE'
        },
        {
          _id: '13',
          name: 'Milada',
          country: 'CZ'
        }
      ],
      visits: {
        12: [1598126063],
        13: [1578918720, 1579048320]
      }
    }
    expect(getFrequentSpots(state)).toEqual(expect.arrayContaining([
      expect.objectContaining({
        _id: '12',
        name: 'Wiek'
      }),
      expect.objectContaining({
        _id: '13',
        name: 'Milada'
      })
    ]))
  })
})
