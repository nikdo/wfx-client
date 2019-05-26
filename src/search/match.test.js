import match from './match'

describe('match', () => {
  it('matches single word at the beginning', () => {
    expect(match('Nové Mlýny', 'No')).toEqual([[0, 2]])
  })

  it('matches single word in the middle', () => {
    expect(match('Nové Mlýny', 'Ml')).toEqual([[5, 7]])
  })

  it('returns emtpy array given no match', () => {
    expect(match('Nové Mlýny', 'x')).toEqual([])
  })

  it('returns only first match', () => {
    expect(match('Bora Bora', 'B')).toEqual([[0, 1]])
  })

  it('ignores casing', () => {
    expect(match('Beauduc', 'be')).toEqual([[0, 2]])
  })

  it('ignores diacritics', () => {
    expect(match('Rügen', 'Ru')).toEqual([[0, 2]])
  })

  it('matches multiple words', () => {
    expect(match('La Franqui', 'La Fr')).toEqual([[0, 5]])
  })

  it('ingores whitespace at the beginning of query', () => {
    expect(match('Beauduc', ' Be')).toEqual([[0, 2]])
  })

  it('does not ignoe whitespace at the end of query', () => {
    expect(match('La Franqui', 'La ')).toEqual([[0, 3]])
  })

  it('does not match middle of the word', () => {
    expect(match('Beaudc', 'ea')).toEqual([])
  })

  it('does not match middle of the word and matches start of second word', () => {
    expect(match('Boneshaker Area', 'a')).toEqual([[11, 12]])
  })

  it('treats non-word characters as spaces', () => {
    expect(match('Fos-sur-mer', 'Fos-sur')).toEqual([[0, 7]])
    expect(match('Fos-sur-mer', 'Fos sur')).toEqual([[0, 7]])
    expect(match('L\'Almanarre', 'L\'Al')).toEqual([[0, 4]])
    expect(match('L\'Almanarre', 'L Al')).toEqual([[0, 4]])
  })

  it('treats multiple non-word characters as a single space', () => {
    expect(match('L\'Almanarre', 'L \'-.Al')).toEqual([[0, 4]])
  })

  it('ignores regex characters', () => {
    expect(match('/^[]$/Beauduc', '/^[]$/B')).toEqual([[6, 7]])
  })
})
