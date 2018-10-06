import trimLevelsCeilings from './trimLevelsCeilings'

describe('trimLevelsCeilings', () => {
  it('has a max ceiling larger than max value', () => {
    const result = trimLevelsCeilings([19, 21], 20)
    expect(Math.max(...result)).toBeGreaterThanOrEqual(20)
  })

  it('has a max ceiling equal to max value', () => {
    const result = trimLevelsCeilings([19, 20, 21], 20)
    expect(Math.max(...result)).toEqual(20)
  })

  it('has only single celing larger than max value', () => {
    const result = trimLevelsCeilings([21, 22], 20)
    expect(result.filter(ceiling => ceiling >= 20).length).toEqual(1)
  })

  it('has all ceiligs lower than max value', () => {
    const result = trimLevelsCeilings([1, 2, 3, 20, 21], 20)
    expect(result.filter(ceiling => ceiling < 20)).toEqual([1, 2, 3])
  })

  it('adds rounded ceiling for max value larger than max ceiling', () => {
    const result = trimLevelsCeilings([0, 1, 2, 3], 7.3)
    expect(result).toEqual([0, 1, 2, 3, 8])
  })
})
