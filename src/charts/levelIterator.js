export default (bftCeilings, scales, skippedLevels) => iterator => {
  const levelsCeilings = bftCeilings.slice(skippedLevels)
  const levels = levelsCeilings.reduce((levels, breakpoint, i, levelsCeilings) => [
    ...levels,
    {
      start: scales.y(levelsCeilings[i - 1] || 0),
      end: scales.y(levelsCeilings[i])
    }
  ], [])

  levels.forEach(({ start, end }, level) => iterator(level + skippedLevels, start, end))
}
