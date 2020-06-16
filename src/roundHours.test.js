import moment from 'moment-timezone'
import roundHours from './roundHours'

describe('roundHours', () => {
  it('rounds down to full hour given less than half hour after', () => {
    const input = moment('2030-01-01 09:29').unix()
    const output = moment('2030-01-01 09:00').unix()
    expect(roundHours(input)).toEqual(output)
  })

  it('rounds up to full hour given more than half hour after', () => {
    const input = moment('2030-01-01 09:30').unix()
    const output = moment('2030-01-01 10:00').unix()
    expect(roundHours(input)).toEqual(output)
  })

  it('rounds up to full hour given exactly half hour after', () => {
    const input = moment('2030-01-01 09:31').unix()
    const output = moment('2030-01-01 10:00').unix()
    expect(roundHours(input)).toEqual(output)
  })

  it('does not round given already rounded', () => {
    const input = moment('2030-01-01 09:00').unix()
    const output = moment('2030-01-01 09:00').unix()
    expect(roundHours(input)).toEqual(output)
  })
})
