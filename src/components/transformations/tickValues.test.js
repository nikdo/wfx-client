import tickValues from './tickValues'

describe('tickValues', () => {
  it('has a max ceiling larger than max value', () => {
    const result = tickValues([19, 21], 20)
    expect(Math.max(...result)).toBeGreaterThanOrEqual(20)
  })

  it('has a max ceiling equal to max value', () => {
    const result = tickValues([19, 20, 21], 20)
    expect(Math.max(...result)).toEqual(20)
  })

  it('has only single celing larger than max value', () => {
    const result = tickValues([21, 22], 20)
    expect(result.filter(ceiling => ceiling >= 20).length).toEqual(1)
  })

  it('has all ceiligs lower than max value', () => {
    const result = tickValues([1, 2, 3, 20, 21], 20)
    expect(result.filter(ceiling => ceiling < 20)).toEqual([1, 2, 3])
  })
})
