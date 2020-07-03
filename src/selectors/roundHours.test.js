import moment from 'moment-timezone'
import roundHours, { getMatchingTime } from './roundHours'

describe('roundHours', () => {
  it('rounds down to full hour given less than half hour after', () => {
    const input = moment('2030-01-01 09:29').unix()
    const output = moment('2030-01-01 09:00').unix()
    expect(roundHours(input)).toEqual(output)
  })

  it('rounds up to full hour given more than half hour after', () => {
    const input = moment('2030-01-01 09:31').unix()
    const output = moment('2030-01-01 10:00').unix()
    expect(roundHours(input)).toEqual(output)
  })

  it('rounds up to full hour given exactly half hour after', () => {
    const input = moment('2030-01-01 09:30').unix()
    const output = moment('2030-01-01 10:00').unix()
    expect(roundHours(input)).toEqual(output)
  })

  it('does not round given already rounded', () => {
    const input = moment('2030-01-01 09:00').unix()
    const output = moment('2030-01-01 09:00').unix()
    expect(roundHours(input)).toEqual(output)
  })
})

describe('getMatchingTime', () => {
  it('returns undefined when no matching time is present', () => {
    const round = time => time
    const sunrises = [
      moment('2030-01-01 09:20').unix(),
      moment('2030-01-01 19:13').unix()
    ]
    const time = moment('2030-01-01 09:10').unix()
    expect(getMatchingTime(round)(sunrises)(time))
      .toEqual(undefined)
  })

  it('returns exact time when matching time is found', () => {
    const round = time => time
    const sunrises = [
      moment('2030-01-01 09:20').unix(),
      moment('2030-01-01 19:13').unix()
    ]
    const time = moment('2030-01-01 19:13').unix()
    expect(getMatchingTime(round)(sunrises)(time))
      .toEqual(moment('2030-01-01 19:13').unix())
  })

  it('returns exact time when matching floored time is found', () => {
    const floorHour = time => time - time % (60 * 60)
    const sunrises = [
      moment('2030-01-01 09:20').unix(),
      moment('2030-01-01 19:56').unix()
    ]
    const time = moment('2030-01-01 19:13').unix()
    expect(getMatchingTime(floorHour)(sunrises)(time))
      .toEqual(moment('2030-01-01 19:56').unix())
  })
})
