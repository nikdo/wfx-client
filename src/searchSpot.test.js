import searchSpot from './searchSpot'

describe('searchSpot', () => {
  it('returns spots with names starting with query', () => {
    expect(searchSpot(
      [{ name: 'Foo' }, { name: 'Far' }, { name: 'Boo' }],
      'F'
    )).toEqual(
      [{ name: 'Foo' }, { name: 'Far' }]
    )
  })

  it('returns empty array when no name starts with query', () => {
    expect(searchSpot(
      [{ name: 'Foo' }, { name: 'Boo' }],
      'X'
    )).toEqual(
      []
    )
  })

  it('ignores casing', () => {
    expect(searchSpot(
      [{ name: 'Foo' }, { name: 'Boo' }],
      'f'
    )).toEqual(
      [{ name: 'Foo' }]
    )
  })

  it('trims query whitespace', () => {
    expect(searchSpot(
      [{ name: 'Foo' }, { name: 'Boo' }],
      ' f '
    )).toEqual(
      [{ name: 'Foo' }]
    )
  })

  it('ignores diacritics in query', () => {
    expect(searchSpot(
      [{ name: 'coo' }, { name: 'boo' }],
      'čó'
    )).toEqual(
      [{ name: 'coo' }]
    )
  })

  it('ignores diacritics in spot name', () => {
    expect(searchSpot(
      [{ name: 'čóó' }, { name: 'boo' }],
      'co'
    )).toEqual(
      [{ name: 'čóó' }]
    )
  })
})
