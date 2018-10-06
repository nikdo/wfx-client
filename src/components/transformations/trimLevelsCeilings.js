import { bisectLeft } from 'd3'

export default (levelsCeilings, maxValue) => {
  const maxLevel = bisectLeft(levelsCeilings, maxValue)
  return levelsCeilings[maxLevel] === undefined
    ? [...levelsCeilings, Math.ceil(maxValue)]
    : levelsCeilings.slice(0, maxLevel + 1)
}
