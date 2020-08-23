import moment from 'moment-timezone'
import { getFrequentSpotsIds, getFrequentSpots } from './selectors'

const unixTime = {
  10: moment('2021-01-10').unix(),
  11: moment('2021-01-11').unix(),
  12: moment('2021-01-12').unix(),
  13: moment('2021-01-13').unix(),
  14: moment('2021-01-14').unix(),
  15: moment('2021-01-15').unix(),
  16: moment('2021-01-16').unix(),
  17: moment('2021-01-17').unix(),
  18: moment('2021-01-18').unix(),
  19: moment('2021-01-19').unix(),
  20: moment('2021-01-20').unix(),
  21: moment('2021-01-21').unix(),
  22: moment('2021-01-22').unix(),
  23: moment('2021-01-23').unix(),
  24: moment('2021-01-24').unix(),
  25: moment('2021-01-25').unix(),
  26: moment('2021-01-26').unix(),
  27: moment('2021-01-27').unix()
}

describe('getFrequentSpotsIds', () => {
  it('returns IDs of all visited spots given 2 spots visited', () => {
    const state = {
      visits: {
        12: [unixTime[21]],
        13: [unixTime[22]]
      }
    }
    expect(getFrequentSpotsIds(state))
      .toEqual(expect.arrayContaining(['12', '13']))
  })

  it('sorts IDs by number of visits', () => {
    const state = {
      visits: {
        12: [unixTime[21]],
        13: [unixTime[22], unixTime[23], unixTime[24]],
        14: [unixTime[25], unixTime[26]]
      }
    }
    expect(getFrequentSpotsIds(state)).toEqual(['13', '14', '12'])
  })

  it('sorts IDs with same number of visits by last visited time', () => {
    const state = {
      visits: {
        12: [unixTime[24]],
        13: [unixTime[22], unixTime[23]],
        14: [unixTime[25], unixTime[26]],
        15: [unixTime[21]],
        16: [unixTime[27]]
      }
    }
    expect(getFrequentSpotsIds(state)).toEqual(['14', '13', '16', '12', '15'])
  })

  it('returns only first 12 IDs given more than 12 spots visited', () => {
    const state = {
      visits: {
        1: [unixTime[11]],
        2: [unixTime[12]],
        3: [unixTime[13]],
        4: [unixTime[14]],
        5: [unixTime[15]],
        6: [unixTime[16]],
        7: [unixTime[17]],
        8: [unixTime[18]],
        9: [unixTime[19]],
        10: [unixTime[20]],
        11: [unixTime[21]],
        12: [unixTime[22]],
        13: [unixTime[23]],
        14: [unixTime[24]]
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
