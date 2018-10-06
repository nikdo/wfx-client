import { bisectLeft } from 'd3'

export default (levelsCeilings, maxValue) => {
  const maxLevel = bisectLeft(levelsCeilings, maxValue) + 1
  return levelsCeilings.slice(0, maxLevel)
}
