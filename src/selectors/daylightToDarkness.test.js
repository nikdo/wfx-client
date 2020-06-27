import moment from 'moment-timezone'
import daylightToDarkness from './daylightToDarkness'

describe('daylightToDarkness', () => {
  it('transforms daylight to darkness', () => {
    const days = [
      {
        sunriseTime: moment('2030-01-01 09:00').unix(),
        sunsetTime: moment('2030-01-01 20:00').unix()
      },
      {
        sunriseTime: moment('2030-01-02 09:00').unix(),
        sunsetTime: moment('2030-01-02 20:00').unix()
      }
    ]
    const darkness = [
      {
        end: moment('2030-01-01 09:00').unix()
      },
      {
        start: moment('2030-01-01 20:00').unix(),
        end: moment('2030-01-02 09:00').unix()
      },
      {
        start: moment('2030-01-02 20:00').unix()
      }
    ]
    expect(daylightToDarkness(days)).toEqual(darkness)
  })
})
