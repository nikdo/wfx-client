import moment from 'moment-timezone'
import {
  setHourlyDaylight,
  setDarkness,
  setFrameDaylight,
  getMatchingSunrise
} from './daylight'

describe('getMatchingSunrise', () => {
  it('returns undefined when no matching rounded sunrise', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:20').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const time = moment('2030-01-01 08:00').unix()
    expect(getMatchingSunrise(daylight)(time)).toEqual(undefined)
  })

  it('returns exact sunrise time when matching rounded sunrise', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const time = moment('2030-01-01 09:00').unix()
    expect(getMatchingSunrise(daylight)(time))
      .toEqual(moment('2030-01-01 09:29').unix())
  })
})

describe('setFrameDaylight', () => {
  it('sets isDaylight to false when time is before sunrise', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const frame = {
      time: moment('2030-01-01 08:00').unix()
    }
    expect(setFrameDaylight(daylight)(frame))
      .toHaveProperty('isDaylight', false)
  })

  it('sets isDaylight to true when time is between sunrise and sunset', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const frame = {
      time: moment('2030-01-01 11:00').unix()
    }
    expect(setFrameDaylight(daylight)(frame))
      .toHaveProperty('isDaylight', true)
  })

  it('sets isDaylight to false when time is at rounded sunrise', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const frame = {
      time: moment('2030-01-01 09:00').unix()
    }
    expect(setFrameDaylight(daylight)(frame))
      .toHaveProperty('isDaylight', false)
  })

  it('sets isDaylight to false when time is at rounded sunset', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const frame = {
      time: moment('2030-01-01 19:00').unix()
    }
    expect(setFrameDaylight(daylight)(frame))
      .toHaveProperty('isDaylight', false)
  })

  it('sets sunrise time when time is at rounded sunrise', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const frame = {
      time: moment('2030-01-01 09:00').unix()
    }
    expect(setFrameDaylight(daylight)(frame))
      .toHaveProperty('sunrise', moment('2030-01-01 09:29').unix())
  })

  it('does not set sunrise time when time is not rounded sunrise', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const frame = {
      time: moment('2030-01-01 11:00').unix()
    }
    expect(setFrameDaylight(daylight)(frame))
      .not.toHaveProperty('sunrise')
  })

  xit('sets sunset time when time is at rounded sunset', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const frame = {
      time: moment('2030-01-01 19:00').unix()
    }
    expect(setFrameDaylight(daylight)(frame))
      .toHaveProperty('isDaylight', false)
  })

  xit('does not set sunset time when time is not rounded sunset', () => {
    const daylight = [
      {
        sunriseTime: moment('2030-01-01 09:29').unix(),
        sunsetTime: moment('2030-01-01 19:13').unix()
      }
    ]
    const frame = {
      time: moment('2030-01-01 19:00').unix()
    }
    expect(setFrameDaylight(daylight)(frame))
      .toHaveProperty('isDaylight', false)
  })
})

describe('setHourlyDaylight', () => {
  it('sets isDaylight flag', () => {
    const weather = {
      daylight: [
        {
          sunriseTime: moment('2030-01-01 09:29').unix(),
          sunsetTime: moment('2030-01-01 19:13').unix()
        },
        {
          sunriseTime: moment('2030-01-02 09:31').unix(),
          sunsetTime: moment('2030-01-02 19:11').unix()
        }
      ],
      hourly: [
        { time: moment('2030-01-01 08:00').unix() },
        { time: moment('2030-01-01 09:00').unix() },
        { time: moment('2030-01-01 10:00').unix() },
        { time: moment('2030-01-01 11:00').unix() }
      ]
    }
    expect(setHourlyDaylight(weather)).toHaveProperty('hourly', [
      expect.objectContaining({ isDaylight: false }),
      expect.objectContaining({ isDaylight: false }),
      expect.objectContaining({ isDaylight: true }),
      expect.objectContaining({ isDaylight: true })
    ])
  })
})

describe('setDarkness', () => {
  it('removes daylight prop', () => {
    const weather = {
      daylight: [
        {
          sunriseTime: moment('2030-01-01 09:29').unix(),
          sunsetTime: moment('2030-01-01 19:13').unix()
        }
      ]
    }
    expect(setDarkness(weather)).not.toHaveProperty('daylight')
  })

  it('adds darkness property with shifted and rounded items', () => {
    const weather = {
      daylight: [
        {
          sunriseTime: moment('2030-01-01 09:29').unix(),
          sunsetTime: moment('2030-01-01 19:13').unix()
        },
        {
          sunriseTime: moment('2030-01-02 09:31').unix(),
          sunsetTime: moment('2030-01-02 19:11').unix()
        }
      ]
    }
    expect(setDarkness(weather)).toHaveProperty('darkness', [
      {
        end: moment('2030-01-01 09:00').unix()
      },
      {
        start: moment('2030-01-01 19:00').unix(),
        end: moment('2030-01-02 10:00').unix()
      },
      {
        start: moment('2030-01-02 19:00').unix()
      }
    ])
  })
})
