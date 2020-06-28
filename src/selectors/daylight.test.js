import moment from 'moment-timezone'
import { getRoundedDaylight } from './daylight'

describe('getRoundedDaylight', () => {
  it('returns rounded daylight', () => {
    const days = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      },
      {
        sunriseTime: moment('2030-01-02 09:31').unix(),
        sunsetTime: moment('2030-01-02 19:11').unix()
      }
    ]
    expect(getRoundedDaylight(days)).toEqual([
      {
        sunriseTime: moment('2030-01-01 09:00').unix(),
        sunsetTime: moment('2030-01-01 19:00').unix()
      },
      {
        sunriseTime: moment('2030-01-02 10:00').unix(),
        sunsetTime: moment('2030-01-02 19:00').unix()
      }
    ])
  })
})
